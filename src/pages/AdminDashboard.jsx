import { useEffect, useState } from "react";

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/service";

import PostModal from "./PostModels/PostModal";
import UserModal from "./UserModels/UserModal";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const [openPost, setOpenPost] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const [editPost, setEditPost] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // LOAD DATA

  const loadPosts = async () => {
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  // POST CRUD

  const handlePostCreate = () => {
    setEditPost(null);
    setOpenPost(true);
  };

  const handlePostEdit = (post) => {
    setEditPost(post);
    setOpenPost(true);
  };

  const handlePostDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    await deletePost(id);
    loadPosts();
  };

  const handlePostSubmit = async (data) => {
    if (editPost) {
      await updatePost(editPost._id, data);
    } else {
      await createPost(data);
    }

    setOpenPost(false);
    loadPosts();
  };

  // USER
  const handleUserCreate = () => {
    setEditUser(null);
    setOpenUser(true);
  };
  const handleUserEdit = (user) => {
    setEditUser(user);
    setOpenUser(true);
  };
  const handleUserDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await deleteUser(id);
    loadUsers();
  };
  const handleUserSubmit = async (data) => {
    if (editUser) {
      await updateUser(editUser._id, data);
    } else {
      await createUser(data);
    }

    setOpenUser(false);
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500 mt-2">Manage Users and Blog Posts</p>
        </div>

        {/* ================= USERS ================= */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-green-600 to-emerald-500">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                User Management
              </h2>
              <p className="text-green-100 text-sm">
                Total Users : {users.length}
              </p>
            </div>

            <button
              onClick={handleUserCreate}
              className="bg-white text-green-700 font-semibold px-5 py-2 rounded-lg hover:bg-green-100 transition"
            >
              + Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="text-left px-6 py-4">Name</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-center px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-t hover:bg-slate-50 transition ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium">{user.name}</td>

                      <td className="px-6 py-4 text-slate-600">{user.email}</td>

                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleUserEdit(user)}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleUserDelete(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= POSTS ================= */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-indigo-600 to-blue-500">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Post Management
              </h2>

              <p className="text-blue-100 text-sm">
                Total Posts : {posts.length}
              </p>
            </div>

            <button
              onClick={handlePostCreate}
              className="bg-white text-indigo-700 font-semibold px-5 py-2 rounded-lg hover:bg-indigo-100 transition"
            >
              + Add Post
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-6 py-4">Title</th>
                  <th className="text-left px-6 py-4">Content</th>
                  <th className="text-left px-6 py-4">Author</th>
                  <th className="text-center px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <tr
                      key={post._id}
                      className={`border-t hover:bg-slate-50 transition ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold">{post.title}</td>

                      <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                        {post.content}
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                          {post.author}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handlePostEdit(post)}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handlePostDelete(post._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      No Posts Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <PostModal
          isOpen={openPost}
          onClose={() => setOpenPost(false)}
          onSubmit={handlePostSubmit}
          editData={editPost}
        />

        <UserModal
          isOpen={openUser}
          onClose={() => setOpenUser(false)}
          onSubmit={handleUserSubmit}
          editData={editUser}
        />
      </div>
    </div>
  );
}
