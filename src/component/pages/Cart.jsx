import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import EcomContext from "../../context/EcomContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";



function Cart() {
  const { cartItems, updateQuantity, deleteItem, totalAmount, isAuthenticated } = useContext(EcomContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const cartTable = (
    <>
      <table className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto">
        <thead>
          <tr>
            <th className="p-2">Action</th>
            <th className="p-2">Item</th>
            <th className="p-2">Image</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {cartItems.products?.map((item) => (
            <tr className="border-b-2" key={item.product._id}>
              <td className="p-2">
                <button onClick={() => deleteItem(item.product._id)}>
                  <MdDelete className="text-2xl text-orange-500" />
                </button>
              </td>
              <td className="p-2">{item.product.name}</td>
              <td className="p-2">
                <div className="flex justify-center">
                  <img
                    src={"https://tehnotronix-api.onrender.com/" + item.product.img}
                    className="h-[50px]"
                    alt={item.product.name}
                  />
                </div>
              </td>
              <td className="p-2">₦{item.product.price}</td>
              <td className="p-2">
                <input
                  type="number"
                  className="outline outline-1"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                />
              </td>
              <td className="p-2">₦{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto mt-5 flex justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Total = ₦{totalAmount()}</h1>
        </div>
        <div>
          <Link to="/checkout">
            <button className="bg-orange-500 text-white p-2 sm:p-3 md:p-4 rounded-md hover:bg-orange-200 hover:text-black">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="m-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">Your Shopping Cart</h1>
      {cartItems.products && cartItems.products.length > 0 ? (
        cartTable
      ) : (
        <h1 className="text-center font-bold">No Items</h1>
      )}
    </div>
  );
}

export default Cart;