import { useState } from "react"
import { registerUser } from "../api/api";

export default function Register ({ setScreen }) {

    const [form, setForm] = useState({
        name: "" ,
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!form.name  || !form.email || !form.password || !form.confirmPassword) {
            setError("All fields are required");
            return
        }

        if(form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return
        }

        if(form.password !== form.confirmPassword) { 
            setError("password does not match");
            return
        }


        try{
            const result = await registerUser(form);
            if(result.message === "User is registered successfully") {
                alert("Registration successful! Please login with your credentials.");
                setScreen("login");
            } else {
                setError(result.message);
            }

        }catch(err){
            setError(err.message || "Registration failed");
        }
    }

    return(
        <div className="h-screen flex justify-center items-center bg-green-300">
            <form className="bg-white p-10 rounded-md"
                  onSubmit={handleSubmit}>

                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <input 
                type="text"
                placeholder="Enter the Name"
                className="w-full p-2 mb-2 border rounded-xl"
                onChange={(e) => setForm({
                    ...form, 
                    name: e.target.value
                })}/>

                 <input 
                type="email"
                placeholder="Enter the Email"
                className="w-full p-2 mb-2 border rounded-xl"
                onChange={(e) => setForm({
                    ...form, 
                    email: e.target.value
                })}/>

                 <input 
                type="password"
                placeholder="Enter the Password"
                className="w-full p-2 mb-2 border rounded-xl"
                onChange={(e) => setForm({
                    ...form, 
                    password: e.target.value
                })}/>

                 <input 
                type="password"
                placeholder="Enter the ConfirmPassword "
                className="w-full p-2 mb-2 border rounded-xl"
                onChange={(e) => setForm({
                    ...form, 
                    confirmPassword: e.target.value
                })}/>

                <button className="w-full bg-green-600 text-white p-2 mt-4 rounded-2xl cursor-pointer">
                    Register
                </button>

                <p className="mt-3 text-center font-bold text-blue-600 hover:text-red-500 cursor-pointer"
                   onClick={() => setScreen("login")}>
                    Back to login
                </p>

            </form>
            
        </div>
    )
}