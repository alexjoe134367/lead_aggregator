import React from 'react';
import EntityModal from "../index";
import { compose } from 'recompose';
import { DomainFormContainer, DomainContainer } from "@containers";
import DomainForm from "components/@common/forms/domain";

const DomainModal = (props) => (
    <EntityModal {
        ...{
            ...props,
            show: (props.form.isDomain === false ? false : props.form.show ? true : false),
            Container: DomainForm
        }
    }
    />
);

export default compose(DomainFormContainer, DomainContainer)(DomainModal);