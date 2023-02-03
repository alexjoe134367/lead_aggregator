import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'semantic-ui-react';
import './index.scss';
import {Auth} from "@services";
import { compose } from 'recompose';
import {CompaniesContainer} from '@containers';

class DomainForm extends Component {

  onChangeFirst = (e) => {
    this.props.changeForm({ changeable: e.target.value });
  };

  onChangeCompany = (e,data) => {
    this.props.changeForm({ company: data.value });
  };

  onChangeDomain = (e,data) => {
    this.props.changeForm({ domain: data.value });
  };

  render() {
    const { type, changeable, company, domain } = this.props.form;
    const { companies,domains } = this.props;

    const companyOption = companies.map((company,index)=>({
      key :index,
      value:company.id,
      text:company.name
    }));

    const domainOption = [{ key: 0, value: 0, text: "No domain" }];
    domains.map( (domain, index) => {
      domainOption.push({
        key: index * 1 + 1,
        value: domain.id,
        text: domain.name
      })
    })

    return (
      <Form className='domainForm'>
        {
          type === 0
          ?
          <>
            <Form.Field required>
              <label>Project</label>
              <Form.Field
                control={Input}
                placeholder={'Project Name'}
                value={changeable || ''}
                onChange={(e)=>this.onChangeFirst(e)}
                />
            </Form.Field>
            {Auth.role === "agency" &&
              <Form.Field required>
                <label>Company</label>
                <Select placeholder='Select Company' value={company} options={companyOption} onChange={(e,data) =>this.onChangeCompany(e,data)}/>
              </Form.Field>
            }
          </>
          :type === 1
          ?
          <>
            <Form.Field>
              <label>Host</label>
              <Form.Field
                control={Input}
                placeholder='https://example.com'
                value={changeable || ''}
                onChange={(e)=>this.onChangeFirst(e)}
                />
                <label>Enter the exact domain name you want your projects to be accessible with. It can be a subdomin(example.yourdomain.com) or root domain(yourdomain.com)</label>
            </Form.Field>
            <Form.Field>
              <label>Add A Record</label>
              <p className='top note arecord'><span>A</span> 70.34.197.136</p>
              <label>Add this A record to your domain by visiting your DNS provider or register</label>
            </Form.Field>
          </>
          :type===2
          ?
          <>
            <Form.Field>
              <label>Host</label>
              <Form.Field
                control={Input}
                placeholder='Template Name'
                value={changeable || ''}
                onChange={(e)=>this.onChangeFirst(e)}
                />
            </Form.Field>
          </>
          :
          <Form.Field required>
            <label>Site Url</label>
            <Select placeholder='Select Your Own Domain' value={domain} options={domainOption} onChange={(e,data) =>this.onChangeDomain(e,data)}/>
          </Form.Field>
        }
      </Form>
    )
  }
}

export default  compose(CompaniesContainer)(DomainForm);