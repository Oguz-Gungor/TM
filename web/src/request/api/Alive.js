import BaseService from "../BaseService";

const apiService = new BaseService();
export default () => apiService.get(`/alive`);
