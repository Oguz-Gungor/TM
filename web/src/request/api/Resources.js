import BaseService from "../BaseService";

const basePath = "/resources";
const apiService = new BaseService();
const Info = () => apiService.get(`${basePath}/info`);

const Update = (email, dateBirthday, fullName) =>
  apiService.patch(`${basePath}/update`, { email, dateBirthday, fullName });

export default { Info, Update };
