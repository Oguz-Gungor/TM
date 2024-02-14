import BaseService from "../BaseService";

const basePath = "/auth";
const apiService = new BaseService();
const SignUp = (email, dateBirthday, fullName, password) =>
  apiService.post(`${basePath}/signUp`, {
    email,
    dateBirthday,
    fullName,
    password,
  });
const SignIn = (fullName, password) =>
  apiService.post(`${basePath}/signIn`, { fullName, password });

export default { SignUp, SignIn };
