import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import EcomContext from "../../context/EcomContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch] = useContext(AuthContext);
    const { showAndHide } = useContext(EcomContext);
    const { setItem } = useLocalStorage("auth-token");

    const isAuthenticated = state.accessToken !== null
    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    const redirect = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://tehnotronix-api.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            console.log(data);

            if (data === "Invalid") {
                showAndHide("error", "Invalid Email/Password")
            } else {
                dispatch({
                    type: "setToken",
                    payload: data.token
                });
                setItem(data.token);
                redirect("/");
                showAndHide("success", "Login Successful!!!");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='h-[70vh] w-[50%] mt-[80px]'>
            <div className="w-[50%] mx-auto font-semibold">
                <h1 className="text-2xl font-bold pb-9">Login Here</h1>
                <form onSubmit={loginHandler}>

                    <div className="flex flex-col gap-3 mb-3">
                        <label className='font-bold' htmlFor="">Email</label>
                        <input className="outline outline-1" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-3 mb-3">
                        <label className='font-bold' htmlFor="password">Password</label>
                        <input className="outline outline-1" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className="bg-black text-white p-[10px] rounded-md hover:bg-orange-500">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;