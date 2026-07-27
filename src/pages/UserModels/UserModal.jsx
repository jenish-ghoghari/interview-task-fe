import { useEffect, useState } from "react";


export default function UserModal({
    isOpen,
    onClose,
    onSubmit,
    editData
}) {

    console.log(editData);
    

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });


    useEffect(() => {
        if (editData) {
            setForm({
                name: editData.name || "",
                email: editData.email || "",
                password: editData.password ,
                role: editData.role || "Viewer"
            });
        }
        else {
            setForm({
                name: "",
                email: "",
                password: "",
                role: "Viewer"
            });
        }

    }, [editData]);

    if (!isOpen)
        return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-96">
                <h2 className="text-xl font-bold mb-4">
                    {editData ? "Edit User" : "Add User"}

                </h2>
                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                {
                    !editData &&
                    <input
                        className="border p-2 w-full mb-3"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />

                }
                <select
                    className="border p-2 w-full mb-3"
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                >
                    <option value="Viewer">
                        Viewer
                    </option>
                    <option value="Admin">
                        Admin
                    </option>
                </select>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-3 py-2 bg-gray-400 text-white rounded">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(form)}
                        className="px-3 py-2 bg-green-600 text-white rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>

    )

}