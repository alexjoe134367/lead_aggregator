import * as actions from './actions';
import * as builderactions from '../../builder/actions';
import { hideLoader, showLoader } from '../../loader/actions';

import { sendMessage } from '@containers/messages/thunks';

import {customizePage} from "./api";
import {editPage} from "./../../builder/api";

export const saveForm = form => async(dispatch) => {
    try {
        dispatch(showLoader());
        if(!form.name){
            throw new Error('Missing required Validation!');
        }
        let data = {};
        data.output = localStorage.getItem('output');
        data.type = form.type;
        data.name = form.name;
        let id = localStorage.getItem('id');
        
        if(id && data.output){
            if(data.output === "project"){
                data.project_id = id;
            }else if(data.output === "template"){
                data.template_id = id;
            }

            let res;
            if(form.type === 0 || form.type === 1){
                data.name = form.name;
                if(form.type === 1){
                    data.content = '<html><head><style>'+form.editor.getCss()+'</style></head><body>'+form.editor.getHtml()+'</body></html>';
                    data.gjs = localStorage.getItem('gjsProject');
                }

                res = await(customizePage(data));
                res = res.data;
                if(res.state === "success"){
                    await dispatch(sendMessage('Successfully Page Create!'));
                    await dispatch(builderactions.addPage(res.page));
                    await dispatch(actions.saveForm(form));
                }else if(res.state === "noproject"){
                    await dispatch(sendMessage('No project!'),true);
                }else if(res.state === "existpage"){
                    await dispatch(sendMessage('Already page exist!'),true);
                }else{
                    await dispatch(sendMessage('Error create page!'),true);
                }
            }else if(form.type === 2){
                if(data.output === "project"){
                    data.project_id = id;
                }else if(data.output === "template"){
                    data.template_id = id;
                }
                data.page_id = form.id;
                data.title = form.pagetitle;
                data.description = form.description;
                res = await(editPage(data));
                res = res.data;
                if(res.state === 'success'){
                    await dispatch(builderactions.editPageSetting(data));
                    await dispatch(actions.closeForm({}));
                    await dispatch(sendMessage('Page setting saved'));
                }else{
                    await dispatch(actions.closeForm({}));
                    await dispatch(sendMessage('Error! Please try again'),true);
                }
            }
        }
    } catch (e) {
        sendMessage(e.message, true);
    }
    dispatch(hideLoader());
};