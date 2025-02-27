export const baseUrl = "http://localhost:4000";

export const AUTH_ENDPOINTS = {
  resgister: `${baseUrl}/api/user/register`,
  login: `${baseUrl}/api/user/login`,
};

export const TODOS_ENDPOINTS = {
  get: `${baseUrl}/api/todos`,
  create: `${baseUrl}/api/todos`,
  update: (id: string) => `${baseUrl}/api/todos/${id}`,
  delete: (id: string) => `${baseUrl}/api/todos/${id}`,
};
