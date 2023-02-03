import * as actions from './actions';
import * as domainactions from './../domain/actions';
import { sendMessage } from '@containers/messages/thunks';
import { fetchProject, fetchTemplate, editPage, delPage } from "./api";
import { hideLoader, showLoader } from '../loader/actions';

export const initData = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        let id = localStorage.getItem('id');
        let output = localStorage.getItem('output');
        if (id && output) {
            if (output === "project") {
                let res = await fetchProject({ project_id: id });
                res = res.data;
                if (res == null) {
                    // await dispatch(sendMessage('Loading Error!'));
                } else {
                    await dispatch(actions.getPages(res.pages));
                    // await dispatch(sendMessage('Project Loading'));
                }
            } else if (output === "template") {
                let res = await fetchTemplate({ template_id: id });
                res = res.data;
                if (res == null) {
                    // await dispatch(sendMessage('Loading Error!'));
                } else {
                    await dispatch(actions.getPages(res.pages));
                    // await dispatch(sendMessage('Project Loading'));
                }
            }
        }
        // await dispatch(sendMessage('Loading Error!'));
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());

}

export const savePage = (editor, pageID, preview_image) => async (dispatch) => {
    try {
        dispatch(showLoader());
        let data = {};
        data.output = localStorage.getItem('output');
        data.page_id = pageID;
        data.content = '<html><head><title>{{ $title ? $title : "" }}</title><meta name="description" content="{{ $description ? $description : "" }}"></meta><style>' + editor.getCss() + '</style></head><body>' + editor.getHtml() + '</body></html>';
        data.gjs = localStorage.getItem('gjsProject');

        if (data.output === "project") {
            data.project_id = localStorage.getItem('id');
            if (preview_image) {
                data.preview_image = preview_image;
            }
        } else if (data.output === "template") {
            data.template_id = localStorage.getItem('id');
        }
        let res = await (editPage(data));
        res = res.data;
        if (res.state === 'success') {
            await dispatch(actions.editPage(data));
            if (data.preview_image) {
                await dispatch(domainactions.editProjectPreview(data));
            }
            await dispatch(sendMessage('Page saved'));
        } else {
            await dispatch(sendMessage('Error! Please try again'));
        }
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());
};

export const deletePage = (pageID) => async (dispatch) => {
    try {
        dispatch(showLoader());
        let res = await (delPage(pageID));
        res = res.data;
        if (res.state === 'success') {
            await dispatch(actions.deletePage(pageID));
            await dispatch(sendMessage('Page deleted'));
        } else {
            await dispatch(sendMessage('Error! Please try again'));
        }
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());
}