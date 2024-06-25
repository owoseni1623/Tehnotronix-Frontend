import Carousel from "./component/Carousel"
import Headers from "./component/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Featured from "./component/Featured"
import TopSelling from "./component/TopSelling"
import Products from "./component/pages/Products"
import Footer from "./component/Footer"
import Detail from "./component/pages/Detail"
import Checkout from "./component/pages/Checkout"
import { EcomProvider } from "./context/EcomContext"
import Cart from "./component/pages/Cart"
import Alert from "./component/Alert"
import Register from "./component/pages/Register"
import Login from "./component/pages/Login"
import ThankYou from "./component/pages/ThankYou"
import { AuthProvider } from "./context/AuthContext"
import useLocalStorage from "./hooks/useLocalStorage"

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem();
  let authInitialState = { accessToken: token ?? null };

  return (
    <AuthProvider defaultState={authInitialState}>
      <EcomProvider>
        <Router>
          <Headers />
          <Alert />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Carousel />
                  <Featured />
                  <TopSelling />
                </>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thanks" element={<ThankYou />} />
          </Routes>
          <Footer />
        </Router>
      </EcomProvider>
    </AuthProvider>
  );
}

export default App;