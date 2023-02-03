import React, { Component } from 'react';
import {
  Form,
  Input,
} from 'semantic-ui-react';
import './index.scss';
import { compose } from 'recompose';
import {BuildContainer} from '@containers';

class BuildForm extends Component {
  state = {};

  componentDidMount(){
  }

  onChange = (e) => {
    this.props.changeForm({ name: e.target.value });
  };

  onChangeTitle = (e) =>{
    this.props.changeForm({ pagetitle: e.target.value });
  }

  onChangeDescription = (e) =>{
    this.props.changeForm({ description: e.target.value });
  }

  render() {
    const { name,pagetitle,description,type } = this.props.form;
    return (
      <>
      {type === 2 ? 
        <Form className='buildForm'>
          <Form.Field required>
            <label>Page</label>
            <Form.Field
              control={Input}
              placeholder={'Page Name'}
              value={name || ''}
              onChange={(e)=>this.onChange(e)}
              />
          </Form.Field>
          <Form.Field required>
            <label>Title</label>
            <Form.Field
              control={Input}
              placeholder={'Title of your page here'}
              value={pagetitle || ''}
              onChange={(e)=>this.onChangeTitle(e)}
              />
          </Form.Field>
          <Form.Field required>
            <label>Description</label>
            <Form.TextArea
              placeholder={'Description'}
              value={description || ''}
              onChange={(e)=>this.onChangeDescription(e)}
              />
          </Form.Field>
        </Form>
        :
        <Form className='buildForm'>
          <Form.Field required>
            <label>Page</label>
            <Form.Field
              control={Input}
              placeholder={'Page Name'}
              value={name || ''}
              onChange={(e)=>this.onChange(e)}
              />
          </Form.Field>
        </Form>
      }
      </>
    )
  }
}

export default  compose(BuildContainer)(BuildForm);