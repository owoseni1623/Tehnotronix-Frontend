import React from 'react'
import Card from "./shared/Card"
import { useContext } from 'react';
import EcomContext from '../context/EcomContext';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TopSelling() {
  const { topSelling, addTocart, cartItems } = useContext(EcomContext);
  const [state, dispatch] = useContext(AuthContext)
  const isAuthenticated = state.accessToken !== null
  const redirect = useNavigate()

  const login = ()=>{
    if (!isAuthenticated) {
      redirect("/login")
    }
  }


  return (
    <div className='my-[20px] mx-[30px] pl-[40px]'>
      <h1 className="mb-[10px] text-orange-500 font-bold text-2xl">Top Selling Products</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"> 
        {topSelling.map((item) => (
          <Card key={item._id} description={item.description} descriptionColor="green">
            <Link to={`/detail/${item._id}`}>
              <img src={"http://localhost:3000/" + item.img} alt="" className="h-[200px]" />
            </Link>
            <p className="font-bold">{item.name}</p>
            <p>₦{item.price}</p>
            <button onClick={isAuthenticated ? () => addTocart(item._id) : login} className="bg-orange-500 text-white p-[10px] rounded mt-[10px]">Add to cart</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TopSelling;