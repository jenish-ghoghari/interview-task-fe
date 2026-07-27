import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../services/service";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

    const [user, setUser] = useState(null);
    console.log("User in Navbar", user);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const { data } = await getCurrentUser();
                setUser(data);
            }
            catch (err) {
                console.log(err);
            }
        };
        loadUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        }
        catch (err) {
            console.log(err);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <>
            <nav className="bg-white shadow px-6 py-4 flex justify-between">
                <h1 className="text-xl font-bold">
                    {user?.role === "Admin" ? "Admin" : "User"} Panel
                </h1>
                <div className="flex items-center gap-4">
                    {
                        user && (
                            <div>
                                <p className="font-semibold">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                                <p className="text-blue-600 text-sm">
                                    {user.role}
                                </p>
                            </div>
                        )
                    }
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            </nav>

            <Outlet />

        </>

    );

}