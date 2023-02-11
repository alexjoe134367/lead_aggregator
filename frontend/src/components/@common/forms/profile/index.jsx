import React, {Component} from 'react';
import {compose} from 'recompose'
import {
    Form,
    Input,
    Segment,
    Button,
    Grid,
    label,
    Tab,
    Table,
    Label,
} from 'semantic-ui-react';
import './index.scss';
import avatarDemo from '../avatar-demo.png';
import * as R from "ramda";
import {ProfileContainer, MessagesContainer} from "@containers";
import {AvatarImage} from "components/@common/image";
import {disableAutoComplete} from '../../../../utils';
import {Auth} from "../../../../@services";

class AgentForm extends Component {
    state = {
        // open: false,
        // companyId: null,
        // ready: false,
        // companyStats: {},
        tabIndex: 0,
        tabIndex_big: 0,
        // sortByValue: 'name.desc'
    };
    onChangeTab_big = (e, tab) => {
       
        if (tab.activeIndex === this.state.tabIndex_big) {
          return;
        }
    
        this.setState({
            tabIndex_big: tab.activeIndex,
        });
     console.log("aaaaaaaa",tab.activeIndex,this.state.tabIndex_big);
    };
    onFileLoad = (event) => {
        if (!R.pathOr(false, ['target', 'files'], event)) {
            this.props.sendMessage('Missing required File!', true);
            return false;
        }

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', () => {
            this.props.changeProfileForm({avatar: reader.result})
        }, false);
    };

    onSaveProfile = () => {
        if (this.validate(['name', 'email', 'phone'], this.props.profileForm)) {
            this.props.updateUserProfile(this.props.profileForm);
        }
    };

    onSavePasswordReset = () => {
        if (this.validate(['password', 'password_confirmation'], this.props.passwordResetForm)) {
            this.props.updateUserProfile(this.props.passwordResetForm);
        }
    };
    onRedeemCocode = () => {
        this.props.useRedeemCode(this.props.profile, this.props.cocode);
    }
    onChangeRedeemCocode = (event, data) => {
        this.props.updateCocode(data.value)
    }

    onChange = (event, data) => {
        this.props.changeProfileForm({[data.name]: data.value})
    };

    onChangePassword = (event, data) => {
        this.props.changePasswordResetForm({[data.name]: data.value})
    };

    validate = (requireFields, form) => {
        const requiredFields = R.map(field => {
            if (!form[field]) {
                return {
                    field,
                    required: true,
                }
            }
            return {
                required: false
            }
        }, requireFields) || [];

        const fields = R.reduce((acc, value) => {
            return `${(acc ? acc + ',\n' + value.field : value.field)}`
        }, '', R.filter(field => field.required, requiredFields));

        if (fields) {
            this.props.sendMessage(`Missing required "${fields}"!`, true);
            return false;
        }
        return true;
    };

    componentDidMount() {
        disableAutoComplete();
    }
    onChangeTab = (e, tab) => {
        if (tab.activeIndex === this.state.tabIndex) {
          return;
        }
    
        this.setState({
            tabIndex: tab.activeIndex,
        });
    
    };
    render() {
        const {
            name,
            phone,
            email,
            avatar,
            avatar_path,
            twilio_sid,
            twilio_token,
            twilio_mobile_number,
            mail_host,
            mail_port,
            mail_username,
            mail_password,
            mail_from_address,
        } = this.props.profileForm;
        const {password, password_confirmation} = this.props.passwordResetForm;
        const cocode = this.props.cocode;
        const cocodeList = this.props.cocodeList;
        // console.log("props", this.props);
        const tabs = [
            {
              menuItem: 'Twilio',
              render: () => <></>
            },
            {
              menuItem: 'SMTP',
              render: () => <></>
            }
          ];
        const tabs_big = [
        {
            menuItem: 'My Profile',
            render: () => <></>
        },
        {
            menuItem: 'Appsumo',
            render: () => <></>
        }
        ];
        return (
            <>
                {this.props.profile.role === "AGENCY" && this.props.profile.subscription_type === "BASE" && <Tab onTabChange={this.onChangeTab_big} menu={{ secondary: true, pointing: true }} panes={tabs_big} />}
                
                {
                    this.state.tabIndex_big === 0? 
                    <Form size='big' className='profileForm' style={{'paddingTop':'10px'}}>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column textAlign='left'>
                                <Form.Field required>
                                    <label>Name</label>
                                    <Input placeholder='Name' name='name' value={name || ''} onChange={this.onChange}/>
                                </Form.Field>
                                <Form.Field required>
                                    <label>Phone Number</label>
                                    <Input placeholder='Phone Number' name='phone' value={phone || ''} onChange={this.onChange}/>
                                </Form.Field>
                                <Form.Field required>
                                    <label>Email Address</label>
                                    <Input placeholder='Email Address' name='email' value={email || ''} onChange={this.onChange}/>
                                </Form.Field>
                                {
                                    Auth.isCompany && (
                                    <>
                                        <Tab onTabChange={this.onChangeTab} menu={{ secondary: true, pointing: true }} panes={tabs} />
                                        <p></p>
                                        {this.state.tabIndex === 0?
                                        <>
                                            <Form.Field required>
                                                <label>Twilio SID</label>
                                                <Input placeholder='Twilio SID' name='twilio_sid' value={twilio_sid || ''} onChange={this.onChange}/>
                                            </Form.Field>
                                            <Form.Field required>
                                                <label>Twilio TOKEN</label>
                                                <Input placeholder='Twilio Token' name='twilio_token' value={twilio_token || ''} onChange={this.onChange}/>
                                            </Form.Field>
                                            <Form.Field required>
                                                <label>Twilio Mobile Number</label>
                                                <Input placeholder='Twilio mobile number'
                                                        name='twilio_mobile_number'
                                                        value={twilio_mobile_number || ''}
                                                        onChange={this.onChange}
                                                />
                                            </Form.Field>
                                        </>:<>
                                            <Form.Field required>
                                                <label>mail host</label>
                                                <Input placeholder='MAIL_HOST' name='mail_host' value={mail_host || ''} onChange={this.onChange}/>
                                            </Form.Field>
                                            <Form.Field required>
                                                <label>mail port</label>
                                                <Input placeholder='MAIL_PORT' name='mail_port' value={mail_port || ''} onChange={this.onChange}/>
                                            </Form.Field>
                                            <Form.Field required>
                                                <label>mail username</label>
                                                <Input placeholder='MAIL_USERNAME' name='mail_username' value={mail_username || ''} onChange={this.onChange}/>
                                            </Form.Field>
                                            <Form.Field required>
                                                <label>mail password</label>
                                                <Input placeholder='MAIL_PASSWORD'
                                                        name='mail_password'
                                                        value={mail_password || ''}
                                                        onChange={this.onChange}
                                                />
                                            </Form.Field>
		                                <Form.Field required>
		                                    <label>mail from address</label>
		                                    <Input placeholder='MAIL_FROM_ADDRESS'
		                                            name='mail_from_address'
		                                            value={mail_from_address || ''}
		                                            onChange={this.onChange}
		                                    />
		                                </Form.Field>
                                        </>}
                                        </>
                                    )
                                }
                                <Segment basic>
                                    <AvatarImage size='tiny' circular src={avatar || avatar_path || avatarDemo}/>
                                    <label
                                        htmlFor="avatar"
                                    >
                                        <Button
                                            icon="upload"
                                            label={{
                                                basic: true,
                                                content: 'Select file'
                                            }}
                                            labelPosition="right"
                                        />
                                        <input
                                            hidden
                                            accept=".png, .jpeg, .jpg, image/png, image/jpeg, image/jpg"
                                            id="avatar"
                                            type="file"
                                            onChange={this.onFileLoad}
                                        />
                                    </label>
                                </Segment>
                                <Button floated='right' onClick={this.onSaveProfile} primary>Save</Button>
                            </Grid.Column>
                            <Grid.Column textAlign='left'>
                                <Form.Field required>
                                    <label>Password</label>
                                    <Input placeholder='Password' name='password' value={password} type='password'
                                        onChange={this.onChangePassword}/>
                                </Form.Field>
                                <Form.Field required>
                                    <label>Re-enter Password</label>
                                    <Input placeholder='Re-enter Password' name='password_confirmation'
                                        value={password_confirmation} type='password' onChange={this.onChangePassword}/>
                                </Form.Field>
                                <Button floated='right' onClick={this.onSavePasswordReset} primary>Update password</Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                    :
                    <Form size='big' className='profileForm'  style={{'paddingTop':'10px'}}>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column textAlign='left'>
                                
                                <Input placeholder='AppSumo Code' name='cocode' value={cocode} type='text'
                                        onChange={this.onChangeRedeemCocode}/>
                                <Button floated='right' onClick={this.onRedeemCocode} primary>Redeem</Button>
                                
                                            
                            </Grid.Column>
                            <Grid.Column textAlign='left'>
                                <span style={{'fontSize':'24px'}}>Account type: Agency</span>
                            </Grid.Column>
                        </Grid>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column textAlign='left'>
                                <Table>
                                    <Table.Body>
                                        {cocodeList.map((cocode, i) => {
                                            return (<Table.Row>
                                                        <Table.Cell>
                                                            <Label>{cocode.code}</Label>
                                                        </Table.Cell>
                                                    </Table.Row>)
                                        })}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                            <Grid.Column textAlign='left'>
                            <span style={{'fontSize':'24px'}}>Maximum allowed clients: {this.props.profile.max_agency_companies > 60?'Unlimited Clients':this.props.profile.max_agency_companies}</span>
                            </Grid.Column>
                        </Grid>
                    </Form>
                }
            </>
        )
    }
}

export default compose(ProfileContainer, MessagesContainer)(AgentForm);
