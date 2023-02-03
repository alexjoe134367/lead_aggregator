import React, {Component} from 'react';
import {
    Form,
    Input,
    TextArea,
    Select,
    Grid,
} from 'semantic-ui-react';
import JoditEditor from "jodit-react";
import './index.scss';
import {Auth} from "@services";
import {disableAutoComplete} from '../../../../utils';
const editor = React.createRef();
const config = {
  readonly: false,
};
class EmailForm extends Component {
    componentWillMount() {
        if (this.props.form.id) {
            this.props.filterDealsByDealId(this.props.form.deal_id);
            this.props.filterDealsByCompany(this.props.form.company_id);
            this.props.filterDealCampaignsById(this.props.form.deal_campaign_id);
        }
        if (Auth.isAgency) {
            this.props.loadSelectBoxCompanies();
        }
        if (Auth.isCompany) {
            this.props.changeForm({company_id: this.props.profile.id});
        }
        if (!Auth.isAgent) {
            this.props.getCompanyDeals();
        }
        if (Auth.isAgent) {
            this.props.changeForm({agent_id: this.props.profile.id});
        }
    }

    onChange = (event, data) => {
        this.props.changeForm({[data.name]: data.value});
    };

    onChangeCompany = (event, data) => {
        this.props.changeForm({company_id: data.value});
        if (!Auth.isAgent) {
            this.props.filterDealsByCompany(data.value);
            this.props.filterDealsByDealId('');
            this.props.loadSelectBoxCompanies('');
        }
        if (Auth.isAgent) {
            this.props.loadCompanyCampaigns(data.value);
        }
    };

    onChangeStatus = (event, data) => {
        this.props.changeForm({status: data.value});
    };

    onSearchChange = event => {
        this.props.searchCompanies(event.target.value);
    };

    onChangeDeal = (event, data) => {
        this.props.filterDealsByDealId(data.value);
        this.props.filterDealCampaignsById('');
    };

    onChangeCampaign = (event, data) => {
        this.props.changeForm({deal_campaign_id: data.value});
        if (!Auth.isAgent) {
            this.props.filterDealCampaignsById(data.value);
        }
    };

    onChangeAgent = (event, data) => {
        this.props.changeForm({agent_id: data.value});
    };

    componentDidMount() {
        disableAutoComplete();
    }

    onChangeEmailContent = (content) => {
        // const { object } = this.props.form;
        // this.props.changeForm({ object: { ...(object || {}), content: content } });
        this.props.changeForm({'content':content});
    };

    onChangeEmailSubject = (event) => {
        const { object } = this.props.form;
        console.log(event.target.value);
        this.props.changeForm({ object: { ...(object || {}), subject: event.target.value } });
    };

    render() {
        const { subject, content, fullname, email, phone, metadata } = this.props.form;
        return (
            <Form size="big" className='leadForm'>
                <Grid columns={1} relaxed="very" stackable>
                    <Grid.Column>
                        <Form.Field required>
                            <label>Subject</label>
                            <Input type="text" placeholder="Subject" value={subject ||''} onChange={this.onChange} name="subject" />
                        </Form.Field>
                        
                        <Form.Field required>
                            <label>Content</label>
                            
                            <Form.Field required>
                              <JoditEditor
                                ref={editor}
                                value={content || ""}
                                config={config}
                                tabIndex={1}
                                onChange={this.onChangeEmailContent}
                              />
                          </Form.Field>
                        </Form.Field>
                       
                    </Grid.Column>
                   
                </Grid>
            </Form>
        );
    }
}

export default EmailForm;
