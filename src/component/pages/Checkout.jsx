import { useContext } from "react";
import EcomContext from "../../context/EcomContext";

function Checkout() {
  const { cartItems, totalAmount, isAuthenticated } = useContext(EcomContext);
  const total = totalAmount();

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const amount = totalAmount();
    const currency = "NGN";

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const phone = e.target.elements.phone.value;
    const address = e.target.elements.address.value;

    try {
      const res = await fetch("https://tehnotronix-api.onrender.com/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          firstName,
          lastName,
          phone,
          address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.link;
      } else {
        console.error(data.msg || "Failed to Initiate Payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 m-5">
      <div className="w-full lg:w-1/2">
        <h1 className="font-bold text-center mb-5">Order Summary</h1>
        <table className="w-full mx-auto h-[30vh]">
          <thead>
            <tr>
              <th>Item</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cartItems.products?.map((item, index) => (
              <tr className="border-b-2" key={index}>
                <td>{item.product.name}</td>
                <td>
                  <div className="flex justify-center">
                    <img
                      src={"https://tehnotronix-api.onrender.com/" + item.product.img}
                      className="h-[50px]"
                      alt={item.product.name}
                    />
                  </div>
                </td>
                <td>₦{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>₦{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Total = ₦{total}</h1>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="mb-5 font-bold text-center">Delivery Information</h1>
        <form onSubmit={handleCheckout} id="orderId">
          <div className="flex flex-col gap-3 mb-3">
            <label className="font-bold" htmlFor="firstName">
              First Name
            </label>
            <input className="outline outline-1 p-2" type="text" id="firstName" name="firstName" />
          </div>
          <div className="flex flex-col gap-3 mb-3">
            <label className="font-bold" htmlFor="lastName">
              Last Name
            </label>
            <input className="outline outline-1 p-2" type="text" id="lastName" name="lastName" />
          </div>
          <div className="flex flex-col gap-3 mb-3">
            <label className="font-bold" htmlFor="phone">
              Phone Number
            </label>
            <input className="outline outline-1 p-2" type="text" id="phone" name="phone" />
          </div>
          <div className="flex flex-col gap-3 mb-3">
            <label className="font-bold" htmlFor="address">
              Address
            </label>
            <textarea
              className="outline outline-1 p-2"
              id="address"
              name="address"
              cols="10"
              rows="5"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-black text-white p-2 sm:p-3 md:p-4 rounded-md hover:bg-orange-500"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
