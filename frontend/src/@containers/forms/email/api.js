import { api, Auth } from "@services";

export const send_Message = (form) => {
  return api.post(`/v1/company/leads/sendemail`, form);
};
