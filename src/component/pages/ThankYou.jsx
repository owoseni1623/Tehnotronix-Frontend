import Thanks from "/img/Thank you.jpg"
import { useContext, useEffect } from "react";
import EcomContext from "../../context/EcomContext";
import { useSearchParams } from "react-router-dom";


function ThankYou() {
  const { createOrder } = useContext(EcomContext);
  const [SearchParams] = useSearchParams();
  const tx_ref = SearchParams.get("tx_ref");
  const transaction_id = SearchParams.get("transaction_id");

  useEffect(() => {
    if (transaction_id && tx_ref) {
      createOrder(transaction_id, tx_ref);
    }
  }, [transaction_id, tx_ref, createOrder]);

  return (
    <div className="flex flex-col items-center my-5 p-5">
      <img src={Thanks} className="h-40 w-full sm:w-2/3 md:w-1/2 lg:w-1/3" alt="Thank you" />
      <p className="text-lg sm:text-xl md:text-2xl my-3 text-center">
        Thank you for your purchase RoadRunner, a representative will get back to you shortly
      </p>
      <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:text-black hover:bg-red-700">
        Manage Orders
      </button>
    </div>
  );
}

export default ThankYou;