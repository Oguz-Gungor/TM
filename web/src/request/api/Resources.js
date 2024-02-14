import BaseService from "../BaseService";

const basePath = "/resources";
const apiService = new BaseService();
const Info = () =>
  apiService.get(`${basePath}/info`);

export default { Info };
