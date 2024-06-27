import avatar from "../assets/image/avatar.png"
import { useState, useRef, useEffect } from "react"
import { HiMenuAlt3 } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useContext } from "react";
import EcomContext from "../context/EcomContext";
import AuthContext from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";



function Header() {
    const [open, setOpen] = useState(false);
    const { cartItems, showAndHide, cartCount } = useContext(EcomContext);
    const [state, dispatch] = useContext(AuthContext);
    const { user } = useAuth();
    const { deleteItem } = useLocalStorage("auth-token");
  
    const isAuthenticated = state.accessToken !== null;
  
    function logout() {
      deleteItem();
      dispatch({ type: "setToken", payload: null });
      showAndHide("success", "you are now signed out");
    }
  
    const showHeader = (
      <div className="sticky top-0 z-20 flex items-center justify-between py-3 px-5 lg:px-8 bg-orange-500 w-full overflow-hidden">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">TECHNOTRONIX</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-4">
          <Link className="text-sm font-medium hover:text-white" to="/">Home</Link>
          <Link className="text-sm font-medium hover:text-white" to="/products">Products</Link>
          <Link className="text-sm font-medium hover:text-white relative" to="/cart">
            <TiShoppingCart className="text-xl" />
            <div className="absolute bottom-2 left-2 bg-black text-center text-white rounded-full h-4 w-4 text-xs pt-0.5">
              {cartItems.length}
            </div>
          </Link>
          <Link className="text-sm font-medium hover:text-white" to="/login">Login</Link>
          <Link className="text-sm font-medium hover:text-white" to="/register">Signup</Link>
        </nav>
        <button onClick={() => setOpen(!open)} className="flex items-center justify-center w-9 h-9 lg:hidden">
          <HiMenuAlt3 className="text-3xl text-white" />
        </button>
        <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 left-0 w-full bg-black z-20 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}></div>
        <div className={`fixed lg:hidden left-0 top-0 w-72 h-screen overflow-auto z-20 bg-white transition-all duration-200 ${open ? "translate-x-0" : "translate-x-[-100%]"}`}>
          <nav className="flex flex-col items-center gap-4 pt-20">
            <Link className="text-lg font-medium hover:text-orange-500" to="/">Home</Link>
            <Link className="text-lg font-medium hover:text-orange-500" to="/products">Products</Link>
            <Link className="text-lg font-medium hover:text-orange-500" to="/login">Login</Link>
            <Link className="text-lg font-medium hover:text-orange-500" to="/register">Signup</Link>
          </nav>
        </div>
      </div>
    );
  
    const showAuthHeader = (
      <div className="sticky top-0 z-20 flex items-center justify-between py-3 px-5 lg:px-8 bg-orange-500 w-full overflow-hidden">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">TECHNOTRONIX</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-4">
          <Link className="text-sm font-medium hover:text-white" to="/">Home</Link>
          <Link className="text-sm font-medium hover:text-white" to="/products">Products</Link>
          <Link className="text-sm font-medium hover:text-white relative" to="/cart">
            <TiShoppingCart className="text-xl" />
            <div className="absolute bottom-2 left-2 bg-black text-center text-white rounded-full h-4 w-4 text-xs pt-0.5">
              {cartCount}
            </div>
          </Link>
          <Link onClick={logout} className="text-sm font-medium hover:text-white" to="">Log-out</Link>
          <div className="text-sm font-medium flex items-center gap-2">
            <img src={"https://tehnotronix-api.onrender.com/" + user?.img} alt="" className="h-7 w-7 rounded-full" />
            <p>Hi, {user?.firstName}</p>
          </div>
        </nav>
        <button onClick={() => setOpen(!open)} className="flex items-center justify-center w-8 h-9 lg:hidden">
          <HiMenuAlt3 className="text-3xl text-white" />
        </button>
        <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 left-0 w-full bg-black z-20 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}></div>
        <div className={`fixed lg:hidden left-0 top-0 w-72 h-screen overflow-auto z-20 bg-white transition-all duration-200 ${open ? "translate-x-0" : "translate-x-[-100%]"}`}>
          <nav className="flex flex-col items-center gap-4 pt-20">
            <Link className="text-lg font-medium hover:text-orange-500" to="/">Home</Link>
            <Link className="text-lg font-medium hover:text-orange-500" to="/products">Products</Link>
            <Link className="text-lg font-medium hover:text-orange-500 relative" to="/cart">
              <TiShoppingCart className="text-3xl" />
              <div className="absolute bottom-4 left-4 bg-black text-center text-white rounded-full h-6 w-6 text-sm pt-0.5">
                {cartCount}
              </div>
            </Link>
            <Link onClick={logout} className="text-lg font-medium hover:text-orange-500" to="">Logout</Link>
            <div className="text-lg font-medium flex items-center gap-2">
              <img src={"https://tehnotronix-api.onrender.com/" + user?.img} alt="" className="h-7 w-7 rounded-full" />
              <p>Hi, {user?.firstName}</p>
            </div>
          </nav>
        </div>
      </div>
    );
  
    return <>{isAuthenticated ? showAuthHeader : showHeader}</>;
  }
  
  export default Header;