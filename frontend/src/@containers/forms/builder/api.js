import { api2, Auth } from "@services";

export const fetchDomain = () => api2.get(`/v1/company/domain`);

export const customizePage = form => api2.post(`/v1/${Auth.role}/page/${Auth.user.id}`, form);