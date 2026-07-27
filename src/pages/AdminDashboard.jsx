import { useEffect, useState } from "react";

import {
    createPost,
    deletePost,
    getPosts,
    updatePost,

    getUsers,
    createUser,
    updateUser,
    deleteUser
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
        }
        catch (err) {
            console.log(err);
        }
    };


    const loadUsers = async () => {
        try {
            const { data } = await getUsers();
            setUsers(data);
        }
        catch (err) {
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

        if (!window.confirm("Delete this post?"))
            return;

        await deletePost(id);
        loadPosts();
    };


    const handlePostSubmit = async (data) => {

        if (editPost) {
            await updatePost(editPost._id, data);
        }
        else {
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

        if (!window.confirm("Delete this user?"))
            return;

        await deleteUser(id);
        loadUsers();
    };  
    const handleUserSubmit = async (data) => {

        if (editUser) {
            await updateUser(editUser._id, data);
        }
        else {
            await createUser(data);
        }

        setOpenUser(false);
        loadUsers();
    };



    return (

        <div className="space-y-10">
            {/* Users */}
            <div className="bg-white rounded shadow p-6">
                <div className="flex justify-between mb-5">
                    <h2 className="text-2xl font-bold">
                        User Management
                    </h2>
                    <button
                        onClick={handleUserCreate}
                        className="bg-green-600 text-white px-4 py-2 rounded">
                        Add User
                    </button>
                </div>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">
                                Name
                            </th>
                            <th className="border p-2">
                                Email
                            </th>
                            <th className="border p-2">
                                Role
                            </th>
                            <th className="border p-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user._id}>
                                    <td className="border p-2">
                                        {user.name}
                                    </td>
                                    <td className="border p-2">
                                        {user.email}
                                    </td>
                                    <td className="border p-2">
                                        {user.role}
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleUserEdit(user)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleUserDelete(user._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* posts */}
            <div className="bg-white rounded shadow p-6">
                <div className="flex justify-between mb-5">
                    <h2 className="text-2xl font-bold">
                        Post Management
                    </h2>
                    <button
                        onClick={handlePostCreate}
                        className="bg-green-600 text-white px-4 py-2 rounded">
                        Add Post
                    </button>
                </div>


                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">
                                Title
                            </th>
                            <th className="border p-2">
                                Content
                            </th>
                            <th className="border p-2">
                                Author
                            </th>
                            <th className="border p-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map(post => (
                                <tr key={post._id}>
                                    <td className="border p-2">
                                        {post.title}
                                    </td>
                                    <td className="border p-2">
                                        {post.content}
                                    </td>
                                    <td className="border p-2">
                                        {post.author}
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handlePostEdit(post)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handlePostDelete(post._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
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

    );

}