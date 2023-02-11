import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'recompose';
import {AuthContainer} from "@containers";
import {Button, Form, Grid, Header, Image, Segment} from 'semantic-ui-react';
import './index.scss';
import logo from '../static/assets/logo.png';
import { SessionStorage } from '../../@services';

class Register extends Component {
  email = '';
  password = '';
  name = '';
  cocode = '';

  onEmailChange = (event) => {
    this.email = event.target.value;
  };

  onPasswordChange = (event) => {
    this.password = event.target.value;
  };
  onNameChange = (event) => {
    this.name = event.target.value;
  };
  onCocodeChange = (event) => {
    this.cocode = event.target.value;
  };


  register = () => {
    this.props.register(this.name, this.email, this.password, this.cocode);
  };

  goMobileSignup = () => {
    if (window.webViewBridge !== undefined) {
      window.webViewBridge.send('onSignup', {url: 'http://convertlead.com'}, function (res) {
        console.log("===Success Send Signup Data to app!!! ===: ", res);
      }, function (err) {
        console.error("===Error Send Signup Data to app!!! ===: ", err);
      });
    }
  };

  async componentWillMount() {
    if (SessionStorage.getItem('session')) {
      await this.props.autoLogin();
    } else {
      this.props.logout();
    }
  }

  render() {
    return (
      <div className='login-form'>
        {/* {
          this.props.isAuthorised ? <Redirect from='/login' to='/dashboard'/> : null
        }  */}
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}} className="logincontainer">
            <Form size='large' onSubmit={this.register}>
              <Segment stacked>
                <Header as='h2' color='teal' textAlign='center'>
                  <Image src={logo}/>
                </Header>
                <p> Welcome Sumo-lings </p>

                <label>Name</label>
                <Form.Input
                  fluid
                  icon={{className: 'linearicons-user'}}
                  iconPosition='left'
                  placeholder='Name'
                  type='text'
                  onChange={this.onNameChange}/>

                <label>E-mail</label>
                <Form.Input
                  fluid
                  icon={{className: 'linearicons-user'}}
                  iconPosition='left'
                  placeholder='E-mail address'
                  type='text'
                  onChange={this.onEmailChange}/>

                <label>Password</label>
                <Form.Input
                  fluid
                  icon={{className: 'linearicons-lock'}}
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.onPasswordChange}/>
                
                <label>AppSumo Code</label>
                <Form.Input
                  fluid
                  icon={{className: 'linearicons-lock'}}
                  iconPosition='left'
                  placeholder='AppSumo Code'
                  // type='password'
                  type='text'
                  onChange={this.onCocodeChange}/>
                <Button color='teal' fluid size='large'>
                  Register
                </Button>

                <span>Need help? Visit our <a href="http://convertlead.com" id="signupLink"
                                                onClick={this.goMobileSignup}>support desk</a> </span>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default compose(AuthContainer)(Register);