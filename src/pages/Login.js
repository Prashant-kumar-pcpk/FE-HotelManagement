import { useState } from "react";
import { loginUser } from "../api/api";

export default function Login({ setScreen, setUser }) {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("All fields are required");
            return;
        }

        try {
            const result = await loginUser(form);
            if (result.message === "Login is successfull") {
                setUser(result.user);
                setScreen("home");
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-green-300">
            <form className="bg-white p-10 rounded-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Enter the Email"
                    className="w-full p-2 mb-4 border rounded-md"
                    value={form.email}
                    onChange={(e) => setForm({
                        ...form,
                        email: e.target.value
                    })}
                />

                <input
                    type="password"
                    placeholder="Enter the Password"
                    className="w-full p-2 mb-2 border rounded-md"
                    value={form.password}
                    onChange={(e) => setForm({
                        ...form,
                        password: e.target.value
                    })}
                />

                <button className="w-full bg-blue-600 text-white p-2 mt-4 rounded-2xl cursor-pointer">
                    Login
                </button>

                <p
                    className="mt-3 text-center text-green-600 cursor-pointer"
                    onClick={() => setScreen("register")}
                >
                    Don't have an account? 
                    <span className="text-blue-600 hover:text-red-500 font-bold"> Register here</span>
                </p>
            </form>
        </div>
    );
}