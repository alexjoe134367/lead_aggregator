<?php

namespace App\Repositories;

use App\Models\Company;
use Carbon\Carbon;
use DB;

trait AgentRepository
{
    public function createAgent($data)
    {
        $data['role'] = Company::$ROLE_AGENT;
        return $this->createUser($data);
    }

    public static function contactedLeadsGraph(
        $startDate,
        $endDate,
        $agentId,
        $companyAgencyIds = null,
        $format = 'Y-m-d', $pieGraph = false) {
        $st_dt = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
        $end_dt = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

        $sql = 'SELECT
                    SUM( IF (reply_date BETWEEN created_at AND DATE_ADD(created_at, INTERVAL +15 MINUTE), 1, 0) ) AS up15Minutes,
                    SUM( IF (reply_date BETWEEN DATE_ADD(created_at, INTERVAL +15 MINUTE) AND DATE_ADD(created_at, INTERVAL +30 MINUTE), 1, 0) ) AS up30Mintes,
                    SUM( IF (reply_date BETWEEN DATE_ADD(created_at, INTERVAL +30 MINUTE) AND DATE_ADD(created_at, INTERVAL +2 HOUR), 1, 0) ) AS up2Hours,
                    SUM( IF (reply_date BETWEEN DATE_ADD(created_at, INTERVAL +2 HOUR) AND DATE_ADD(created_at, INTERVAL +12 HOUR), 1, 0) ) AS up12Hours,
                    SUM(
                        CASE
                            WHEN (reply_date > DATE_ADD(created_at, INTERVAL 12 HOUR)) OR (reply_date IS NULL AND created_at < DATE_FORMAT(DATE_ADD(NOW(), INTERVAL -12 HOUR), "%Y-%m-%d")) THEN 1 ELSE 0
                        END
                    ) AS 12plus
                FROM (
                    SELECT a.id, a.agent_id, a.lead_status_id, a.created_at, b.reply_date
                    FROM leads AS a
                    LEFT JOIN (
                        SELECT lead_id, lead_status_id, MIN(created_at) AS reply_date
                        FROM lead_notes
                        WHERE agent_id = "' . $agentId . '" AND lead_status_id > 3 AND lead_status_id < 9
                        GROUP BY lead_id
                        ORDER BY lead_id, created_at
                    ) AS b ON a.id = b.lead_id
                    WHERE a.agent_id = "' . $agentId . '" 
                    AND a.lead_status_id > 3 AND a.lead_status_id < 9 AND 
                    a.`created_at` BETWEEN "' . $st_dt . '" AND "' . $end_dt . '"
                ) AS res
                GROUP BY agent_id';

        // DB::statement("SET sql_mode = ''");
        DB::statement("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));");

        $result = DB::select($sql);
        $result = json_decode(json_encode($result), true);
        DB::statement("SET sql_mode=(SELECT CONCAT(@@sql_mode, ',ONLY_FULL_GROUP_BY'));");

        $averageResponseTime = static::getAverageTime($startDate, $endDate, $companyAgencyIds, $agentId, $format);
        if ($pieGraph) {
            return static::mapLeadsToPieGraph($result, $averageResponseTime, $startDate, $endDate, $format);
        }
        return static::mapLeadsToLineGraph($result, $averageResponseTime, $startDate, $endDate, $format);
    }

    public static function getAverageTime($startDate,
        $endDate,
        $companyAgencyIds = null,
        $agentId = null, $format = 'Y-m-d') {

        $st_dt = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
        $end_dt = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

        /*
         * doesn't work this.

        $query = Lead::selectRaw("SUBSTRING_INDEX(SEC_TO_TIME(AVG(TIME_TO_SEC(TIMEDIFF(ln.created_at, leads.created_at)))), '.', 1) AS avg_response")
        ->join('lead_notes AS ln', 'ln.lead_id', 'leads.id')
        ->join('lead_statuses AS ls', 'ls.id', 'ln.lead_status_id')
        ->where(function ($query) {
        $query
        ->where('ls.type', "'CONTACTED_SMS'")
        ->orWhere('ls.type', "'CONTACTED_CALL'")
        ->orWhere('ls.type', "'CONTACTED_EMAIL'");
        })
        ->whereBetween('leads.created_at', [
        "'" . $st_dt . "'",
        "'" . $end_dt . "'",
        // "'2019-08-07 00:00:00'",
        // "'2019-08-14 23:59:59'"
        ]);

        if ($companyAgencyIds) {
        $query->whereIn('leads.agency_company_id', $companyAgencyIds);
        }

        $query->where('leads.agent_id', $agentId);

        // return $query->first();

         */
        $sql = 'select
                    SUBSTRING_INDEX(
                        SEC_TO_TIME(
                            AVG(
                                TIME_TO_SEC(TIMEDIFF(ln.created_at, leads.created_at))
                            )
                        ),
                        " . ",
                        1
                    ) AS avg_response
                from
                    `leads`
                    inner join `lead_notes` as `ln` on `ln`.`lead_id` = `leads`.`id`
                    inner join `lead_statuses` as `ls` on `ls`.`id` = `ln`.`lead_status_id`
                where
                (
                        `ls`.`type` = "CONTACTED_SMS"
                        or `ls`.`type` = "CONTACTED_CALL"
                        or `ls`.`type` = "CONTACTED_EMAIL"
                        or `ls`.`type` = "MISSED"
                    )
                    and `leads`.`created_at` between "' . $st_dt . '" and "' . $end_dt . '"
                    and `leads`.`agent_id` = ' . $agentId . '
                    and `leads`.`deleted_at` is null;';

        $result = DB::select($sql);
        return $result[0];
    }

    public static function mapLeadsToLineGraph($leads, $averageResponseTime, $startDate, $endDate, $format = 'Y-m-d')
    {
        $interval = new \DateInterval('P1D');
        $dateRange = new \DatePeriod(new \DateTime($startDate), $interval, new \DateTime($endDate));

        $dateCollection = collect($dateRange)->map(function ($date) use ($format) {
            return $date->format($format);
        });
        $dateCollection[] = $endDate;

        $datasets = [
            [
                "label" => '15 min (0-15)',
                "data" => 'up15Minutes',
                "backgroundColor" => ['rgba(0, 0, 0, 0)'],
                "borderColor" => ['#21ba45'],
                "borderWidth" => 2,
            ],
            [
                "label" => '30 min (15-30)',
                "data" => 'up30Mintes',
                "backgroundColor" => ['rgba(0, 0, 0, 0)'],
                "borderColor" => ['#f2711c'],
                "borderWidth" => 2,
            ],
            [
                "label" => '2 hrs (30-2)',
                "data" => 'up2Hours',
                "backgroundColor" => ['rgba(0, 0, 0, 0)'],
                "borderColor" => ['#2cb3c8'],
                "borderWidth" => 2,
            ],
            [
                "label" => '12 hrs (2-12)',
                "data" => 'up12Hours',
                "backgroundColor" => ['rgba(0, 0, 0, 0)'],
                "borderColor" => ['#6435c9'],
                "borderWidth" => 2,
            ],
            [
                "label" => '12 hrs + Missed',
                "data" => '12plus',
                "backgroundColor" => ['rgba(0, 0, 0, 0)'],
                "borderColor" => ['#db2828'],
                "borderWidth" => 2,
            ],
        ];

        $datasets = collect($datasets)->map(function ($dataset) use ($leads, $dateCollection) {
            $fieldName = $dataset['data'];
            $dataset['data'] = collect($dateCollection)->map(function ($date) use ($leads, $fieldName) {
                return isset($leads->where('creation_date', $date)->first()[$fieldName]) ? (int) $leads->where('creation_date', $date)->first()[$fieldName] : 0;
            });
            return $dataset;
        });

        return [
            'avg_response_time' => (isset($averageResponseTime->avg_response) ? $averageResponseTime->avg_response : '00:00:00'),
            'labels' => $dateCollection,
            'datasets' => $datasets,
        ];
    }

    public static function mapLeadsToPieGraph($leads, $averageResponseTime, $startDate, $endDate, $format = 'Y-m-d')
    {
        $interval = new \DateInterval('P1D');
        $dateRange = new \DatePeriod(new \DateTime($startDate), $interval, new \DateTime($endDate));

        $dateCollection = collect($dateRange)->map(function ($date) use ($format) {
            return $date->format($format);
        });
        $dateCollection[] = $endDate;
        $labels = ['15 min (0-15)', '30 min (15-30)', '2 hrs (30-2)', '12 hrs (2-12)', '12 hrs + Missed'];
        $backGroundColors = ['#7ebf3a', '#ffb500', '#4d77ff', '#6c40be', '#ff3649'];

        $datasets = [
            'backgroundColor' => $backGroundColors,
            'data' => [
                'up15Minutes',
                'up30Mintes',
                'up2Hours',
                'up12Hours',
                '12plus',
            ],
        ];

        $datasets['data'] = collect($datasets['data'])->map(function ($fieldName) use ($leads, $dateCollection) {
            return collect($leads)->reduce(function ($acc, $lead) use ($leads, $fieldName) {
                $temp = isset($lead[$fieldName]) ? (int) $lead[$fieldName] : 0;
                return $acc + $temp;
            });
        });

        return [
            'avg_response_time' => ($averageResponseTime->avg_response ? $averageResponseTime->avg_response : '00:00:00'),
            'labels' => $labels,
            'datasets' => [
                $datasets,
            ],
        ];
    }
}
