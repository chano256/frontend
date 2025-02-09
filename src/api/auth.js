import api from "./axios";

export const login = async (credentials) => {
  return await api.post("/auth/login", {
    grant_type: process.env.VUE_APP_API_PASSPORT_GRANT_TYPE,
    client_id: process.env.VUE_APP_API_PASSPORT_CLIENT_ID, // Store in .env
    client_secret: process.env.VUE_APP_API_PASSPORT_CLIENT_SECRET, // Store in .env
    username: credentials.username,
    password: credentials.password,
    scope: "*",
  });
};

export const getUserProfile = async () => {
  return await api.get("/auth/me");
};
