import React from "react";
import {Button, Card} from "semantic-ui-react";
import {CardContent} from "./card-content";
import {Auth} from "@services";

export const DealsComponent = ({ onDealSelected, dealIds, deals, deleted, loadForm, openConfirmModal}) => (
  ((!deals && deals.length === 0) && (
    <div className="empty-deal-wrapper">
      Welcome! Looks like you haven’t created a campaign yet. Once you create one, you’ll see
      it here.
    </div>
  )) || (
    (deleted && (
      <Card.Group>
        {
          deals.map((deal, key) => (
            <Card key={`deals-deleted-${String(key)}`}>
              <Card.Content>
                {
                  Auth.isAgency
                    ? <CardContent  dealIds={dealIds}
                                    onSelectedDeal={onDealSelected} deal={deal} company={deal.company}
                                   link={`/companies/${deal.company.id}/deals/${deal.id}/campaigns`}/>
                    : <CardContent  dealIds={dealIds} onSelectedDeal={onDealSelected} deal={deal} company={deal.company}
                                   link={`/deals/${deal.id}/campaigns`}/>
                }
              </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    )) || <Card.Group>
      { ((deals && deals.length === 0) && (
    <div className="empty-deal-wrapper">
      Welcome! Looks like you haven’t created a campaign yet. Click the plus icon on the top right of this page to start. <a href="https://convertlead.ladesk.com/137942-Getting-Started-with-ConvertLead" target="_blank">Learn more</a>
    </div>
  )) ||

        deals.map((deal, key) => (
          <Card key={`deals-${String(key)}`}>
            <Card.Content>
              {
                Auth.isAgency
                  ? <CardContent  dealIds={dealIds} onSelectedDeal={onDealSelected} deal={deal} company={deal.company}
                                 link={`/companies/${deal.company.id}/deals/${deal.id}/campaigns`}/>
                  : <CardContent  dealIds={dealIds} onSelectedDeal={onDealSelected} deal={deal} company={deal.company}
                                 link={`/deals/${deal.id}/campaigns`}/>
              }
              <Button.Group basic size='small'>
                <Button className='icon' onClick={loadForm.bind(this, {
                  ...deal,
                  companyId: deal.company.id,
                  show: true
                })}><i className='flaticon stroke pencil-1'/></Button>
                <Button className='icon'
                        onClick={openConfirmModal.bind(this, true, deal.company.id, deal.id)}><i className='flaticon stroke trash-1'/></Button>
              </Button.Group>
            </Card.Content>
          </Card>
        ))
      }
    </Card.Group>
  )
)