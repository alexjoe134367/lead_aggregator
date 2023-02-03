import { api2, Auth } from "@services";

export const fetchProjects = () => api2.get(`/v1/company/projects/${Auth.user.id}`);
export const fetchDomains = () => api2.get(`/v1/company/domains/${Auth.user.id}`);
export const fetchTemplates = () => api2.get(`/v1/company/templates`);

export const fetchConnects = () => api2.get(`/v1/company/connects/${Auth.user.id}`);

export const removeProject = (id) => api2.get(`/v1/company/project/del/${id}/${Auth.user.id}`);
export const removeTemplate = (id) => api2.get(`/v1/${Auth.role}/template/del/${id}`);
export const removeDomain = (id) => api2.delete(`/v1/company/domain/${Auth.user.id}/${id}`);
export const editTemplatePreview = (data) => api2.post(`/v1/${Auth.role}/template/${Auth.user.id}`, data);
export const fetchUserInfo = () => api2.get(`/v1/user_info/${Auth.user.id}`);