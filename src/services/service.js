import api from "../api/axios";

export const loginUser = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

export const getCurrentUser = () =>
    api.get("/auth/me");
export const logoutUser = () =>
    api.post("/auth/logout");


// Posts API functions
export const getPosts = () => api.get("/posts");

export const createPost = (data) =>
    api.post("/posts", data);

export const updatePost = (id, data) =>
    api.put(`/posts/${id}`, data);

export const deletePost = (id) =>
    api.delete(`/posts/${id}`);


export const getUsers = () => api.get("/admin/users");
export const createUser = (data) => api.post("/admin/users", data);
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);