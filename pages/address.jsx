import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
const jwt = require('jsonwebtoken');
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';


const Address = ({ user, cart }) => {


  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const router = useRouter();
  const decoded = jwt.decode(user.value);
  const userData = decoded;


  console.log(cart)





  const update = async () => {


    if (pincode.length !== 6) {
      toast.warning("Please enter valid 6 digit pincode", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    else {


      const paymentBody = { userData, address, pincode, city, state }
      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateaddress`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentBody),
      });

      setAddress("")
      setPincode("")
      setCity("")
      setState("")
      const data = await a.json();

      if (data.success) {
        localStorage.setItem('token', data.token)
        toast.success("You address was updated successfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });



        if (Object.keys(cart).length === 0) {


          setTimeout(() => {
            router.push("/myaccount")
          }, 2500);
        }
        else {
          setTimeout(() => {
            router.push("/checkout")
          }, 2500);

        }



      }
      else {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }


  return (

    <section className=' flex items-center justify-center min-h-[100vh] px-5'>
      <Head><title>Edit Address</title></Head>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='bg-gray-300  mt-28 max-md:mt-52 rounded-lg  lg:w-[40vw] w-full  p-5 mb-7'>
        <div>
          <h3 className='font-bold text-xl text-center'>Update Address</h3>


          <div className="flex mt-6 gap-4 md:flex-row flex-col w-full ">

            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="address">Address</label>
              <textarea
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
                type="text"
                className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD] resize-none h-32'

                name='address'
              />


              <div className='flex flex-col gap-2 '>
                <label htmlFor="pincode">Pincode</label>
                <input
                  value={pincode}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) {
                      setPincode(e.target.value);
                    }
                  }}
                  type="number"
                  className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD]'
                  maxLength={6}
                  name='pincode'
                />
              </div>
            </div>



          </div>


          <div className="flex mt-6 gap-4 flex-col w-full ">
            <div className='flex flex-col gap-2  w-full'>
              <label htmlFor="phone">State</label>
              <input
                value={state}
                onChange={(e) => { setState(e.target.value) }}
                type="text"
                className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD]'

                name='state'
              />
            </div>
            <div className='flex flex-col gap-2 l w-full'>
              <label htmlFor="pincode">District</label>
              <input
                value={city}
                onChange={(e) => { setCity(e.target.value) }}
                type="text"
                className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD]'

                name='city'
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              onClick={update}
              className='  nav-btn  bg-[#56E0DD] text-white px-4 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 md:w-1/4 mt-8' >Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Address
