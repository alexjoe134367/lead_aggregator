import * as actions from './actions';
import { sendMessage } from '@containers/messages/thunks';
import { 
    fetchDomains, fetchTemplates, fetchProjects, fetchConnects, 
    removeProject, removeTemplate, removeDomain, editTemplatePreview, fetchUserInfo
} from "./api";
import { hideLoader, showLoader } from '../loader/actions';
import history from './../../history'

export const getData = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        let user_info = await fetchUserInfo();
        user_info = user_info.data;

        let projects = await fetchProjects();
        projects = projects.data;

        let domains = await fetchDomains();
        domains = domains.data;

        let templates = await fetchTemplates();
        templates = templates.data;

        let connects = await fetchConnects();
        connects = connects.data;
        
        await dispatch(actions.addDatas(domains, templates, projects, connects, user_info));
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());
};

export const goBuilder = (builder) => (dispatch) => {
    if (builder.type === 0) {
        localStorage.setItem('output', 'project');
    }
    if (builder.type === 2) {
        localStorage.setItem('output', 'template');
    }
    localStorage.setItem('id', builder.id);
    localStorage.setItem('page_id', builder.page_id);
    localStorage.removeItem("gjsProject");
    Promise.resolve().then(function() {
        localStorage.setItem('gjsProject', builder.gjs);
    }).then(function() {
        history.push('/builder');
    });
};

export const deleteItem = (card) => async (dispatch) => {
    try {
        dispatch(showLoader());
        if (card.type === "project") {
            let project = await removeProject(card.id);
            project = project.data;
            if (project.state === "success") {
                await dispatch(actions.deleteProject(card.id));
                await dispatch(sendMessage(project.message));
            }
        } else if (card.type === "template") {
            let template = await removeTemplate(card.id);
            template = template.data;
            if (template === "success") {
                await dispatch(actions.deleteTemplate(card.id));
            }
        } else if (card.type === "domain") {
            let domain = await removeDomain(card.id);
            if (domain.data.state === "success") {
                await dispatch(sendMessage(domain.data.message));
                await dispatch(actions.deleteDomain(card.id));
            }
        }
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());
}

export const editImage = (card) => async (dispatch) => {
    try {
        dispatch(showLoader());
        let template = await editTemplatePreview(card);
        template = template.data;
        if (template.state === "success") {
            await dispatch(actions.editTemplatePreview(card));
            await dispatch(sendMessage('Template preview is set.'));
        }
    } catch (e) {
        dispatch(sendMessage(e.message, true));
    }
    dispatch(hideLoader());
}