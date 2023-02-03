import React from 'react';
import EntityModal_new from "./EntityModal_email";
import { compose } from 'recompose';

import EmailForm from "components/@common/forms/email";
import {
    CompaniesContainer, DealsContainer, MessagesContainer, EmailFormContainer,
    LeadsContainer, ProfileContainer
  } from "@containers";
const EmailModal = (props) => (
    
    <EntityModal_new {
        ...{
            ...props,
    
            Container: EmailForm
        }
    }
    />
);

export default compose(ProfileContainer, EmailFormContainer, MessagesContainer, LeadsContainer, CompaniesContainer, DealsContainer)(EmailModal);