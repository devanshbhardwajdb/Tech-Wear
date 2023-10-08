import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { auth } from '@/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import Lottie from "lottie-react";
import A1 from "@/anime3.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Head from 'next/head';

const Forgot = ({ user }) => {

  const router = useRouter();

  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false);
  const [newPass, setNewPass] = useState("")
  const [confPass, setConfPass] = useState("")
  const [correct, setCorrect] = useState(true)
  const [correct2, setCorrect2] = useState(true)
  const [isHidden2, setIsHidden2] = useState(true);
  const [isHidden3, setIsHidden3] = useState(true);
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const [verified, setVerified] = useState(false)
  const [isMatched, setIsMatched] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/')
    }
  }, []);



  // console.log(window)

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup();
        },
        'expired-callback': () => {
          // Handle expired callback if needed
        }
      });
    }
  }

  const verifyPhone = async () => {

    if (phone.length !== 10) {
      toast.warning("Please enter valid 10 digit phone number", {
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
      setLoading(true);
      const paymentBody = { phone }
      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verifyphone`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentBody),
      });


      const data = await a.json();

      if (data.success) {
        setShowOTP(true)
        setLoading(false);
        onSignup();

      } else {

        setLoading(false)
        setPhone("")
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
  function onSignup() {

    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier
    

    const formatPh = "+91" + phone
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {

        window.confirmationResult = confirmationResult;
        

        toast.success("OTP has been sent successfully to your number", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }).catch((error) => {
        console.log(error)

      });



  }


  function onOTPverify() {

    setLoading(true);
    window.confirmationResult.confirm(otp)
      .then(async (res) => {
        console.log(res);
        toast.success("OTP Verified", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setVerified(true)

      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }


  const reset = async () => {


    if (confPass === newPass) {
      setCorrect2(true)
      const paymentBody = { phone, newPass }
      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgotpass`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentBody),
      });


      const data = await a.json();

      if (data.success) {


        setNewPass("")
        setConfPass("")

        toast.success("You password was changed successfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          router.push("/login")
        }, 2500);




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
    else {
      setCorrect2(false);
      toast.warning("Confirm and New password should be same", {
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




  return (

    <>

      <Script

        src="https://smtpjs.com/v3/smtp.js"
      />
      <Head><title>Forgot Password</title></Head>

      <div className='min-h-[100vh]  flex justify-center items-center font-livvic  max-md:px-6 max-md:pt-12'>
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
        <div id="recaptcha-container"></div>
        {!verified ? <div className="flex flex-col gap-2 items-center border border-gray-300 md:w-1/2 w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-500 duration-150 transition-all">
          <h3 className="text-gray-800 text-2xl font-bold mb-1">Reset Password</h3>
          <h3 className="text-gray-800 text-base font-medium mb-1 cursor-pointer flex gap-1">or  <Link href={'/login'}><p className='text-[#56E0DD]  hover:text-[#56E0DD] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95'>Login</p></Link></h3>

          <div className="flex mt-6 gap-8  flex-col w-full justify-center">
            <input
              value={phone}
              onChange={(e) => {
                const enteredPhone = e.target.value.replace(/\D/g, '');
                if (enteredPhone.length <= 10) {
                  setPhone(enteredPhone);
                }
              }}
              type="number"
              className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD]'
              placeholder='Mobile Number'
              name='phone'
              required
              readOnly={showOTP}
            />
            {showOTP && <input
              value={otp}
              onChange={(e) => {
                if (otp.length <= 6) {
                  setOtp(e.target.value);
                }


              }}
              type="number"
              className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD]'
              placeholder='Enter the OTP'
              name='otp'
              required
            />

            }


          </div>






          {!showOTP ? <button onClick={() => { verifyPhone() }} className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 w-full mt-12 flex justify-center' >
            {loading ? <Lottie animationData={A1} loop={true} className='w-6' /> : <p>Send OTP</p>}
          </button> :
            <button onClick={() => { onOTPverify() }} className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 w-full mt-12 flex justify-center' >
              {loading ? <Lottie animationData={A1} loop={true} className='w-6' /> : <p>Verify OTP</p>}
            </button>}

        </div> : <div className="flex flex-col gap-2 items-center border border-gray-300 md:w-1/2 w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-500 duration-150 transition-all">
          <h3 className="text-gray-800 text-2xl font-bold mb-1">Reset Password</h3>
          <h3 className="text-gray-800 text-base font-medium mb-1 cursor-pointer flex gap-1">or  <Link href={'/login'}><p className='text-[#56E0DD]  hover:text-[#56E0DD] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95'>Login</p></Link></h3>

          <div className='flex flex-col gap-2 l w-full'>
            <label htmlFor="pincode">New Password</label>
            <div className=' relative  rounded-lg   flex w-full  items-center justify-between'>
              <input
                value={newPass}
                onChange={(e) => { setNewPass(e.target.value) }}
                type={`${isHidden2 ? "password" : "visible"}`}
                className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD] w-full ${(!correct2) ? 'border-red-400 shadow-red-400 shadow-sm' : 'border-gray-300 '}`}

                name='newPass'
              />
              {isHidden2 ?

                (<AiFillEyeInvisible
                  onClick={() => { setIsHidden2(false) }}
                  className='cursor-pointer w-7 h-7 text-gray-400 absolute right-3  '
                />)
                :
                (<AiFillEye
                  onClick={() => { setIsHidden2(true) }}
                  className='cursor-pointer w-7 h-7 text-[#56E0DD] absolute right-3 '
                />)


              }
            </div>
          </div>
          <div className='flex flex-col gap-2 l w-full'>
            <label htmlFor="pincode">Confirm Password</label>
            <div className=' relative  rounded-lg   flex w-full  items-center justify-between'>
              <input
                value={confPass}
                onChange={(e) => { setConfPass(e.target.value) }}
                type={`${isHidden3 ? "password" : "visible"}`}
                className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD] w-full ${(!correct2) ? 'border-red-400 shadow-red-400 shadow-sm' : 'border-gray-300 '}`}

                name='newPass'
              />
              {isHidden3 ?

                (<AiFillEyeInvisible
                  onClick={() => { setIsHidden3(false) }}
                  className='cursor-pointer w-7 h-7 text-gray-400 absolute right-3  '
                />)
                :
                (<AiFillEye
                  onClick={() => { setIsHidden3(true) }}
                  className='cursor-pointer w-7 h-7 text-[#56E0DD] absolute right-3 '
                />)


              }
            </div>
          </div>





          <button
            onClick={reset}

            className='  nav-btn  bg-[#56E0DD] text-white px-4 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300  mt-8 w-full' >Reset
          </button>

        </div>}

      </div>


    </>
  )
}

export default Forgot;
