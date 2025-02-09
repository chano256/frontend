import api from "./axios";

export const login = async (credentials) => {
  return await api.post("/auth/login", {
    grant_type: import.meta.env.VITE_API_PASSPORT_GRANT_TYPE,
    client_id: import.meta.env.VITE_API_PASSPORT_CLIENT_ID, // Store in .env
    client_secret: import.meta.env.VITE_API_PASSPORT_CLIENT_SECRET, // Store in .env
    username: credentials.username,
    password: credentials.password,
    scope: "*",
  });
};

export const getUserProfile = async () => {
  return await api.get("/auth/me");
};
