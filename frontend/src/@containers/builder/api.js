import { api2, Auth } from "@services";

export const fetchProject = form => api2.get(`/v1/company/project/${form.project_id}`);
export const fetchTemplate = form => api2.get(`/v1/company/template/${form.template_id}`);

export const editPage = form => api2.post(`/v1/${Auth.role}/page/${Auth.user.id}`, form);
export const delPage = pageID => api2.get(`/v1/${Auth.role}/page/${pageID}`);