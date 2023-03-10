import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import './index.scss';
import WebHook from "components/@common/forms/integrations/webhook";

class WebhookIntegrationModal extends Component {
  state = {
    open: false,
  };

  render() {
    const { campaignLink }  = this.props;
    return (
      <Modal className='ApiIntegration tiny' open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>Webhook API Integration</Modal.Header>
        <Modal.Content>
          <WebHook campaignLink={campaignLink}/>
        </Modal.Content>
        <Modal.Actions>
            <p className='help-note'>Need help? Browse through our <a href='https://convertlead.ladesk.com/222916-Webhook-Integration' target='__blank'>
                articles, tutorials and resources.
            </a></p>
          <Button color='black' onClick={this.props.onClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default WebhookIntegrationModal