import BaseService from "../BaseService";

const apiService = new BaseService();

const basePath = "/admin";

const All = () => apiService.get(`${basePath}/all?page=0&size=1000`);

const Update = ({ id, email, fullName, dateBirthday }) =>
  apiService.patch(`${basePath}/update/${id}`, {
    email,
    fullName,
    dateBirthday,
  });

const Promote = (id) => apiService.patch(`${basePath}/promote/${id}`);

export default { All, Update,Promote };
