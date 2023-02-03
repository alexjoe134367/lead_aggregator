import * as actions from './actions';
import * as domainactions from './../../domain/actions';
import { Auth } from '@services';
import { sendMessage } from '@containers/messages/thunks';
import { customizeDomain, customizeProject, customizeTemplate, connectProjectToDomain } from "./api";
import { hideLoader, showLoader } from '../../loader/actions';

import history from './../../../history'

export const saveForm = form => (dispatch) => {
    dispatch(showLoader());
    try {
        switch (form.type) {
            case 0:
                dispatch(customProject(form));
                break;
            case 1:
                dispatch(customDomain(form));
                break;
            case 2:
                dispatch(customTemplate(form));
                break;
            case 3:
                dispatch(connectProject(form));
                break;
            default:
                break;
        }
    } catch (e) {
        sendMessage(e.message, true);
    }
    dispatch(hideLoader());
};

export const customProject = form => async (dispatch) => {
    try {
        if (Auth.isAgency ? (!form.changeable || !form.company) : (!form.changeable)
        ) {
            throw new Error('Missing required Validation!');
        }
        // if(form.isNew){
        let res = await (customizeProject(form));
        res = res.data;
        if (res.state === "exist") {
            await dispatch(sendMessage('Already exist project'), true);
        } else if (res.state === 'success') {
            await dispatch(sendMessage('Successfully Project Created!'));
            await dispatch(actions.saveForm(form));
            localStorage.setItem('id', res.project_id);
            localStorage.setItem('page_id', res.page_id);
            localStorage.setItem('output', 'project');
            //history.push('/builder');
            window.location.href = '/pages';
        } else if (res.state === "updated") {
            await dispatch(sendMessage('Successfully Project Edited!'));
            await dispatch(domainactions.editProject(form));
            await dispatch(actions.saveForm(form));
        } else if (res.state === 'exceed'){
            await dispatch(sendMessage('Exceeded number of projects'));
            await dispatch(actions.saveForm(form));
        }
        // }

    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
};

export const customDomain = form => async (dispatch) => {
    try {
        // if (form.isNew) {
            if (!form.changeable) {
                throw new Error('Missing required Domain!');
            }
            if (form.changeable.split('.').length !== 2) {
                throw new Error('Match Domain Format! (ex:yourdomain.com)');
            }
            let res = await (customizeDomain(form));
            res = res.data;
            if (res.state === "success") {
                await dispatch(sendMessage(res.message));
                await dispatch(domainactions.updateDomain(form));
                await dispatch(actions.saveForm(form));
                await dispatch(domainactions.addDomain(res.domain));
            } else if(res.state === "exist") {
                await dispatch(sendMessage('Already exist domain!'), true);
            } else {
                await dispatch(sendMessage(res.message), true);
            }
        // } else {
        // }
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
};

export const customTemplate = form => async (dispatch) => {
    try {
        if (!form.changeable) {
            throw new Error('Missing required Validation!');
        }
        // if(form.isNew){
        let res = await (customizeTemplate(form));
        res = res.data;
        if (res.state === "exist") {
            await dispatch(sendMessage('Already exist template'), true);
        } else if (res.state === 'success') {
            await dispatch(sendMessage('Successfully template create!'));
            await dispatch(actions.saveForm(form));
            localStorage.setItem('id', res.template_id);
            localStorage.setItem('page_id', res.page_id);
            localStorage.setItem('output', 'template');
            history.push('/builder');
        }
        // }

    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
};

export const connectProject = form => async (dispatch) => {
    try {
        if (!form.id) {
            throw new Error('Missing required Validation!');
        }
        let res = await (connectProjectToDomain(form));
        res = res.data;
        if (res.state === "error") {
            await dispatch(sendMessage(res.message), true);
        } else if (res.state === 'success') {
            await dispatch(sendMessage(res.message));
            if (res.flag === 0 ) {
                await dispatch(domainactions.addConnect(res.connect, res.flag));
            }else if(res.flag === 1){
                await dispatch(domainactions.addConnect(res.connect, res.flag));
            }else{
                await dispatch(domainactions.removeConnect(form, res.flag));
            }
            await dispatch(actions.saveForm(form));
        }
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
}