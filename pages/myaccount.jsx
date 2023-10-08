import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
const jwt = require('jsonwebtoken');
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import A1 from "@/anime6.json"
import Lottie from "lottie-react";
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Head from 'next/head';

const myaccount = ({ user }) => {


    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confPass, setConfPass] = useState("")
    const [correct, setCorrect] = useState(true)
    const [correct2, setCorrect2] = useState(true)
    const [isHidden1, setIsHidden1] = useState(true);
    const [isHidden2, setIsHidden2] = useState(true);
    const [isHidden3, setIsHidden3] = useState(true);

    const [isMatched, setIsMatched] = useState(false)


    const [userData, setUserData] = useState(null);
    const router = useRouter();

    // const token = localStorage.getItem('token')
    // const decoded = jwt.decode(token);
    // const userData = decoded;

    // console.log("ye hai user",userData)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/')
        } else {
            const decoded = jwt.decode(token);
            setUserData(decoded);

        }
    }, []);

    const check = async () => {
        const paymentBody = { userData, oldPass }
        const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkpass`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentBody),
        });


        const data = await a.json();

        if (data.success) {
            setIsMatched(true)
            setCorrect(true)
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
            setCorrect(false);

            setOldPass("")
        }
    }
    const reset = async () => {


        if (confPass === newPass) {
            setCorrect2(true)
            const paymentBody = { userData, oldPass, newPass }
            const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/resetpass`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentBody),
            });


            const data = await a.json();

            if (data.success) {

                setOldPass("")
                setNewPass("")
                setIsMatched(false)
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
        <Head><title>My account</title></Head>
            <div className='min-h-[100vh] flex justify-center font-livvic'>
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
                <div className='flex flex-col  lg:w-[60vw] w-full px-5 lg:mt-28 mt-60 pb-10'>

                    <div className='flex items-center justify-center flex-col gap-2 p-5 border-b border-gray-300'>
                        {/* <img src="@/public/profile.png" alt="profile" className='w-14' /> */}
                        <Lottie animationData={A1} loop={false} className='w-[15vw] border-2 border-gray-300 rounded-full  ' />

                        <h3 className='font-bold text-xl text-center'>Welcome👋</h3>
                        <h3 className='font-bold text-3xl text-center'>{userData && userData.name}</h3>

                    </div>
                    <div className='flex items-center  lg:flex-row gap-12  flex-col justify-between mt-5 '>
                        <div className='flex flex-col gap-3 items-center lg:w-1/2 w-full'>
                            <button className=' text-lg font-semibold '><h4>Your address</h4></button>


                            {userData &&
                                <div className='bg-gray-300 p-8 flex flex-col gap-5 rounded-xl w-full'>
                                    <div className="flex gap-5 flex-col">
                                        <h3 className=' text-base font-semibold'>{userData.name}</h3>
                                        <h3 className=' text-base font-semibold'>Mobile : {userData.phone}</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className=' text-sm'>Address : {userData.address}</h3>
                                        <h3 className=' text-sm'>City : {userData.city}</h3>
                                        <h3 className=' text-sm'>State : {userData.state}</h3>
                                        <h3 className=' text-sm'>Pincode : {userData.pincode}</h3>
                                    </div>
                                    <Link href={"/address"}>
                                        <button
                                            className='  nav-btn  bg-[#56E0DD] text-white px-4 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 md:w-1/4 ' >Edit
                                        </button>
                                    </Link>
                                </div>
                            }
                        </div>
                        <div className=' flex flex-col gap-3 items-center lg:w-1/2  w-full '>
                            <button className=' text-lg font-semibold'><h4>Reset Password</h4></button>
                            <div className='bg-gray-300 p-5 rounded-lg w-full'>






                                <div className="flex mt-6 gap-4 flex-col w-full ">
                                    <div className='flex flex-col gap-2  w-full'>
                                        <label htmlFor="phone">Old password</label>
                                        <div className=' relative  rounded-lg   flex w-full  items-center justify-between'>

                                            <input
                                                value={oldPass}
                                                onChange={(e) => { setOldPass(e.target.value) }}
                                                type={`${isHidden1 ? "password" : "visible"}`}
                                                className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD] w-full ${(!correct) ? 'border-red-400 shadow-red-400 shadow-sm' : 'border-gray-300 '}`}
                                                readOnly={isMatched}
                                                name='oldPass'
                                            />
                                            {isHidden1 ?

                                                (<AiFillEyeInvisible
                                                    onClick={() => { setIsHidden1(false) }}
                                                    className='cursor-pointer w-7 h-7 text-gray-400 absolute right-3  '
                                                />)
                                                :
                                                (<AiFillEye
                                                    onClick={() => { setIsHidden1(true) }}
                                                    className='cursor-pointer w-7 h-7 text-[#56E0DD] absolute right-3 '
                                                />)


                                            }
                                        </div>
                                    </div>
                                    {isMatched &&
                                        <>
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
                                        </>
                                    }
                                </div>
                                <div className='flex justify-center'>

                                    {!isMatched ?
                                        <button
                                            onClick={check}

                                            className='  nav-btn  bg-[#56E0DD] text-white px-4 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300  mt-8' >Continue
                                        </button>
                                        :
                                        <button
                                            onClick={reset}

                                            className='  nav-btn  bg-[#56E0DD] text-white px-4 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300  mt-8' >Reset
                                        </button>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default myaccount
