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
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Action</th>
              <th className="p-2">Item</th>
              <th className="p-2 hidden sm:table-cell">Image</th>
              <th className="p-2">Price</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cartItems.products?.map((item) => (
              <tr className="border-b" key={item.product._id}>
                <td className="p-2">
                  <button onClick={() => deleteItem(item.product._id)}>
                    <MdDelete className="text-xl text-orange-500" />
                  </button>
                </td>
                <td className="p-2 text-sm">{item.product.name}</td>
                <td className="p-2 hidden sm:table-cell">
                  <div className="flex justify-center">
                    <img
                      src={"https://tehnotronix-api.onrender.com/" + item.product.img}
                      className="h-10 w-10 object-cover"
                      alt={item.product.name}
                    />
                  </div>
                </td>
                <td className="p-2 text-sm">₦{item.product.price}</td>
                <td className="p-2">
                  <input
                    type="number"
                    className="outline outline-1 w-12 p-1 text-center text-sm"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                  />
                </td>
                <td className="p-2 text-sm">₦{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full mt-5 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-3 sm:mb-0">
          <h1 className="text-xl sm:text-2xl font-bold">Total = ₦{totalAmount()}</h1>
        </div>
        <div>
          <Link to="/checkout">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-200 hover:text-black text-sm sm:text-base">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="px-2 sm:px-5">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-5">Your Shopping Cart</h1>
      {cartItems.products && cartItems.products.length > 0 ? (
        cartTable
      ) : (
        <h1 className="text-center font-bold">No Items</h1>
      )}
    </div>
  );
}

export default Cart;