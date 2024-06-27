import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EcomContext from "../../context/EcomContext"






function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { showAndHide } = useContext (EcomContext)

    const redirect = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://tehnotronix-api.onrender.com/register", {method: "POST",headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    confirmPassword,
                }),  
            })
            const data = await res.json();
            if (data === "exists") {
                showAndHide("error", "User Already Exist") ;
            }else if (data === "invalid") {
                showAndHide("error", "Password must be at least 8 character long and must contain one number and one letter");
            } else if (data  === "no match") {
                showAndHide("error", "Password do not match");
            } else {
                redirect("/login");
                showAndHide("success", "Registration Successful!!!");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

  return (
    <div className='h-[120vh] mt-[90px]'>
         <div className="w-[50%] mx-auto font-semibold">
                <h1 className="text-4xl font-bold pb-[40px] text-center">Register Here</h1>
                
            <form onSubmit={registerHandler}>
            
                <div className="flex flex-col gap-3 mb-3">
                    <label className='font-bold' htmlFor="firstName">
                        First Name
                    </label>
                    <input className="outline outline-1" type="text" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label className='font-bold' htmlFor="lastName">
                        Last Name
                    </label>
                    <input className="outline outline-1" type="text" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label className='font-bold' htmlFor="">
                        Email
                    </label>
                    <input className="outline outline-1" type="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label className='font-bold' htmlFor="phoneNumber">
                        Phone Number
                    </label>
                    <input className="outline outline-1" type="text" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label className='font-bold' htmlFor="">
                        Password
                    </label>
                    <input className="outline outline-1" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label className='font-bold' htmlFor="">
                        Confirm Password
                    </label>
                    <input className="outline outline-1" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div>
                    <button className="bg-black text-white p-[10px] rounded-md hover:bg-orange-500 text-center">
                        Register Here
                    </button>
                </div>
            </form>
            </div>
    </div>
  )
}

export default Register;