export const authTokenKey = "token";

export const getToken = () => {
  return localStorage.getItem(authTokenKey);
};

export const setToken = (token) => {
  localStorage.setItem(authTokenKey, token);
};

export const removeToken = () => {
  localStorage.removeItem(authTokenKey);
};
