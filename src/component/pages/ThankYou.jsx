import Thanks from "/img/Thank you.jpg"
import { useContext, useEffect } from "react";
import EcomContext from "../../context/EcomContext";
import { useSearchParams } from "react-router-dom";


function ThankYou() {
  const { createOrder} = useContext(EcomContext)
  const [SearchParams] = useSearchParams()
  const tx_ref = SearchParams.get("tx_ref")
  const transaction_id = SearchParams.get("transaction_id")

  useEffect(() => {
    if (transaction_id && tx_ref) {
      createOrder(transaction_id, tx_ref)
    }
  }, [transaction_id, tx_ref, createOrder])

  return (
    <div className="flex flex-col items-center my-[5%]">
        <img src={Thanks} className="h-[200px] w-[50%]" alt="" />
        <p className="text-2xl my-[3%]">Thank you for your purchase RoadRunner, a representative will get back to you shortly</p>
        <button className="bg-orange-500 text-white p-[10px] rounded-md hover:text-black hover:bg-red-700">Manage Orders</button>
    </div>
  )
}

export default ThankYou;