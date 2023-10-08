import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React, { useRef, useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import '@/styles/globals.css'

import Lottie from "lottie-react";
import A1 from "@/anime7.json"
import Head from 'next/head'





export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)


  const router = useRouter();





  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
    const token = localStorage.getItem('token');

    if (token) {
      setUser({ value: token })
    }
    setKey(Math.random())

  }, [router.query])

  const logout = () => {
    localStorage.removeItem('token');
    clearCart();
    setUser({ value: null })
    setKey(Math.random());
    router.push('/')
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty

    }
    setSubTotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, size, variant, img) => {

    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img }
    }
    console.log(newCart);
    setCart(newCart)
    saveCart(newCart)

  }

  const buyNow = (itemCode, qty, price, name, size, variant, img) => {

    saveCart({})
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img }
    }

    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')

  }
  const removeFromCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = cart;

    console.log(newCart[itemCode])
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)

  }

  const clearCart = () => {
    console.log("cart cleared ")
    setCart({})
    saveCart({})
  }


  <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    <title>TechWear</title>

  </Head>




  return (
    <>
      <LoadingBar
        color='#56E0DD'
        progress={progress}
        waitingTime={500}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='main relative'>
        {key && <Navbar key={key} cart={cart} setCart={setCart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} setSubTotal={setSubTotal} user={user} logout={logout} />}
        {/* <Lottie animationData={A1} loop={true} className=' w-[100vw]  fixed  z-[-99]  opacity-40 max-md:hidden' /> */}

        <Component  {...pageProps} addToCart={addToCart} cart={cart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} user={user} />
        <Footer />
      </div>
    </>
  )
}
