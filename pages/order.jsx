import React,{useEffect} from 'react'
import { useRouter } from 'next/router'
import Order from "@models/Order";
import mongoose from "mongoose";
import Link from 'next/link';
import Head from 'next/head';

const MyOrder = ({ order,clearCart }) => {
  const products = order.products

  const router = useRouter();

  useEffect(() => {
    
  if(router.query.clearCart == 1){
    clearCart();
  }
    
  }, [])
  






  return (
    <section className="text-gray-600 font-livvic overflow-hidden  lg:pt-5 pt-44 px-[8vw] min-h-[100vh]">
      <Head><title>Order Summary</title></Head>
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5  flex flex-col items-start">
          <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
            <h2 className="text-sm  text-gray-500 tracking-widest">Tech Wear</h2>
            <h1 className="text-gray-900 md:text-3xl  max-md:text-2xl font-medium mb-4 flex flex-wrap">Order Id : {order.orderId}</h1>
            <p className="leading-relaxed mb-4">Your order has been placed successfully. Your payment status is : <span className='font-bold'>{order.status}</span></p>

          </div>
          <div className="flex gap-5 flex-wrap ">
          {Object.keys(products).map((key) => {

            return <div key={key} className='lg:w-[20vw] bg-gray-300 p-6  rounded-xl hover:shadow-lg hover:shadow-gray-500 duration-150 transition-all   mb-6 max-lg:w-full   flex items-center '>


              <a className=" rounded  justify-start w-1/2 ">
                <img alt="ecommerce" className="object-contain object-top w-1/2 " src={products[key].img} />
              </a>
              <div className="mt-4  flex flex-col w-1/2">
                <h3 className="text-gray-500 text-xs mb-1">{products[key].name}</h3>

                <p className="mt-1">₹{products[key].price}</p>
                <p className="mt-1">Qty. {products[key].qty}</p>

              </div>
            </div>


          })
          }
          </div>


          <div className="flex gap-5 mt-8">
            <span className="title-font font-medium text-2xl text-gray-900">Order Total : ₹{order.amount}</span>
            <Link href="/orders"><button className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 '>Continue</button></Link>

          </div>





        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {


  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "teach_wear_products",
      useNewUrlParser: true,
      useUnifiedTopology: true,

    })
  }


  let order = await Order.findById(context.query.id)


  return { props: { order: JSON.parse(JSON.stringify(order)) } }
}

export default MyOrder
