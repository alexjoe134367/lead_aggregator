import * as actions from './actions';
import * as domainactions from './../../domain/actions';
import { Auth } from '@services';
import { sendMessage } from '@containers/messages/thunks';
import { send_Message } from "./api";
import { hideLoader, showLoader } from '../../loader/actions';

import history from './../../../history'

export const sendEmail = form => (dispatch) => {
    dispatch(showLoader());
    try {
    console.log("sendEmail", form);
    dispatch(send_mail(form));
    } catch (e) {
        sendMessage(e.message, true);
    }

    
    dispatch(hideLoader());
};

export const send_mail = form => async (dispatch) => {
    try{
        console.log("form");

        let res = await (send_Message(form));
        res = res.data;
        console.log("res", res );
        if(res.result === "success"){
            await dispatch(sendMessage(res.message));
            await dispatch(actions.closeForm(form));
        } else{
            await dispatch(sendMessage(res.message, true));
            await dispatch(actions.closeForm(form));
        }
    } catch (e){
        dispatch(sendMessage(e.message, true));
    }
    
};
