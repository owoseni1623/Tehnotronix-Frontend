import { useContext, useState } from "react";
import Card from "../shared/Card"
import EcomContext from "../../context/EcomContext";
import SearchBar from "../SearchBar"
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const { product, addTocart } = useContext(EcomContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [state, dispatch] = useContext(AuthContext)
  const isAuthenticated = state.accessToken !== null
  const redirect = useNavigate()

  const login = ()=>{
    if (!isAuthenticated) {
      redirect("/login")
    }
  }

  const filteredProducts = product.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="my-8 mx-4 lg:mx-[30px]">
      <h1 className="mb-4 text-orange-500 font-bold text-2xl lg:text-3xl">All Products</h1>
      <SearchBar newSearch={searchTerm} searchHandle={handleSearchChange} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {filteredProducts.map((item) => (
          <Card key={item._id} description={item.description}>
            <Link to={`/detail/${item._id}`}>
              <img src={"https://tehnotronix-api.onrender.com/" + item.img} alt="" className="h-40 md:h-48 lg:h-56 xl:h-48 object-cover w-full" />
            </Link>
            <div>
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-gray-600">Price: {item.price}</p>
              <button onClick={isAuthenticated ? () => addTocart(item._id) : login} className="bg-orange-500 text-white p-[10px] py-2 px-4 mt-4 rounded">Add to cart</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
