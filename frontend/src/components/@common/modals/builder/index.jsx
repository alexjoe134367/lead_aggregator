import React from 'react';
import EntityModal from "../index";
import { compose } from 'recompose';
import {BuildFormContainer,BuildContainer} from "@containers";
import BuildForm from "components/@common/forms/builder";

const BuildModal = (props) => (<EntityModal {...{...props,show:props.form.show, Container: BuildForm }} />);

export default compose(BuildFormContainer,BuildContainer)(BuildModal);