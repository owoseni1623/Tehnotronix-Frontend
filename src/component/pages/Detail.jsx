import { useParams } from "react-router-dom"
import { useContext } from "react"
import EcomContext from "../../context/EcomContext"
import AuthContext from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"



function Detail() {
  const params = useParams();
  const carid = params.id;
  const { product, addTocart } = useContext(EcomContext);
  const caritems = product.find((item) => item._id === carid);
  const [state, dispatch] = useContext(AuthContext);
  const isAuthenticated = state.accessToken !== null;
  const redirect = useNavigate();

  const login = () => {
      if (!isAuthenticated) {
          redirect("/login");
      }
  };

  return (
      <div className="flex flex-col md:flex-row m-[5%] gap-4">
          <div className="flex justify-center md:justify-start md:m-[5%] gap-4">
              <img src={"https://tehnotronix-api.onrender.com/" + caritems?.img} alt="" className="w-full md:w-auto" />
          </div>
          <div className="w-full md:w-[50%] md:m-[50px]">
              <h1 className="text-xl md:text-2xl font-bold border-b-2 mb-5">{caritems?.name}</h1>
              <p>{caritems?.description}</p>
              <p className="mt-5 font-bold">Category: <span className="italic text-orange-500">{caritems?.category.name}</span></p>
              <p className="text-lg md:text-xl font-bold mb-5 mt-5">{caritems?.price}</p>
              <button onClick={isAuthenticated ? () => addTocart(caritems._id) : login} className="bg-orange-500 p-[10px] rounded-md">Add to cart</button>
          </div>
      </div>
  );
}

export default Detail;