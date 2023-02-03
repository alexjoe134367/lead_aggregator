export const ADD_DATAS = 'ADD_DATAS';
export const ADD_DOMAIN = 'ADD_DOMAIN';
export const UPDATE_DOMAIN = 'UPDATE_DOMAIN';
export const DELETE_DOMAIN = 'DELETE_DOMAIN';

export const ADD_CONNECT = 'ADD_CONNECT';
export const EDIT_CONNECT = 'EDIT_CONNECT';
export const REMOVE_CONNECT = 'REMOVE_CONNECT';

export const EDIT_PROJECT = 'EDIT_PROJECT';
export const EDIT_PROJECT_PREVIEW = 'EDIT_PROJECT_PREVIEW';
export const DEL_PROJECT = 'DEL_PROJECT';

export const DEL_TEMPLATE = 'DEL_TEMPLATE';
export const EDIT_TEMPLATE_PREVIEW = 'EDIT_TEMPLATE_PREVIEW';


export const addDatas = (domains, templates, projects, connects, user_info) => ({
    type: ADD_DATAS,
    projects: projects,
    domains: domains,
    templates: templates,
    connects: connects,
    user_info: user_info,
});

export const addDomain = (domain) => ({
    type: ADD_DOMAIN,
    domain: domain,
});

export const updateDomain = (domain) => ({
    type: UPDATE_DOMAIN,
    domain: domain,
});

export const deleteDomain = (id) => ({
    type: DELETE_DOMAIN,
    id: id,
});

export const editProject = (project) => ({
    type: EDIT_PROJECT,
    project: project,
});

export const editProjectPreview = (project) => ({
    type: EDIT_PROJECT_PREVIEW,
    project: project,
});

export const deleteProject = (pid) => ({
    type: DEL_PROJECT,
    pid: pid,
});
export const deleteTemplate = (tid) => ({
    type: DEL_TEMPLATE,
    tid: tid,
});


export const editTemplatePreview = (template) => ({
    type: EDIT_TEMPLATE_PREVIEW,
    template: template,
});

export const addConnect = (connect, flag) => ({
    type: ADD_CONNECT,
    connect: connect,
    flag: flag,
});

export const editConnect = (connect) => ({
    type: EDIT_CONNECT,
    connect: connect,
});

export const removeConnect = (form, flag) => ({
    type: ADD_CONNECT,
    connect: form,
    flag: flag,
});
