import { api2, Auth } from "@services";

export const fetchDomain = () => api2.get(`/v1/company/domains`);

export const customizeDomain = form => api2.post(`/v1/company/domain/${Auth.user.id}`, form);

export const customizeProject = form => api2.post(`/v1/company/project/${Auth.user.id}`, form);

export const connectProjectToDomain = form => api2.post(`/v1/company/connect/${Auth.user.id}`, form);

export const customizeTemplate = form => api2.post(`/v1/admin/template/${Auth.user.id}`, form);