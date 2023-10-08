
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link';
import img from '@public/logo1.png'
import { useRouter } from 'next/router';


import { IoMdCart } from 'react-icons/io';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { MdAccountCircle } from 'react-icons/md';
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';


const Navbar = ({ user, cart, setCart, addToCart, removeFromCart, clearCart, subTotal, setSubTotal, logout }) => {

  const ref = useRef();
  const router = useRouter();
  const [sidebar, setSidebar] = useState(true)
  const [dropdown, setDropdown] = useState(false);

  const [page, setPage] = useState("");



  useEffect(() => {



    let exempted = ["/checkout", "/order", "/orders"]

    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }


    if (window.innerWidth < 768) { // Adjust this threshold as needed
      setSidebar(false);
    }

    if (router.pathname === "/") {
      setPage("Home")
    }
    if (router.pathname === "/tshirts") {
      setPage("Tshirts")
    }
    if (router.pathname === "/mugs") {
      setPage("Mugs")
    }
    if (router.pathname === "/hoodies") {
      setPage("Hoodies")
    }
    if (router.pathname === "/stickers") {
      setPage("Stickers")
    }



  }, [])
  console.log(page)

  useEffect(() => {
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const sideCartElement = ref.current;



    if (sideCartElement) {
      sideCartElement.style.top = `${navbarHeight}px`;
    }
  }, [sidebar]);



  const toggleCart = () => {

    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
    }

  }
  return (
    <>
      <nav id="navbar" className='navbar flex  bg-white shadow-lg shadow-gray-200  justify-between max-lg:flex-col gap-3  font-livvic px-[8vw] py-[2vh] items-center text-base font-medium text-gray-600 fixed w-full  mb-64 z-20  '>

        <div className="logo flex items-center lg:gap-0 gap-2 max-lg:flex-col gap-4 h-full">
          {/* <HiOutlineMenuAlt1/> */}

          <Link href={"/"}><img src={img.src} alt='Logo' className='rounded-full border' width={50} height={50} /></Link>


        </div>
        <div className="headings flex lg:gap-0 gap-1  items-center justify-center text-black max-md:hidden">

          <Link href={"/"} className={` rounded-lg transition-all duration-300 hover:scale- max-md:hidden py-4 px-8  ${page === "Home" ? "bg-gray-200  " : "hover:bg-gray-200"}`}><h4>HOME</h4></Link>
          <Link href={"/tshirts"} className={`rounded-lg   transition-all duration-300 hover:scale-95 py-4 px-8  ${page === "Tshirts" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>TSHIRTS</h4></Link>
          <Link href={"/hoodies"} className={`rounded-lg   transition-all duration-300 hover:scale-95 py-4 px-8  ${page === "Hoodies" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>HOODIES</h4></Link>
          <Link href={"/mugs"} className={`rounded-lg   transition-all duration-300 hover:scale-95 py-4 px-8 ${page === "Mugs" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>MUGS</h4></Link>
          <Link href={"/stickers"} className={`rounded-lg   transition-all duration-300 hover:scale-95 py-4 px-8  ${page === "Stickers" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>STICKERS</h4></Link>



        </div>
        <div className="headings flex gap-0 items-center justify-center text-black text-sm md:hidden">


          <Link href={"/tshirts"} className={`rounded-lg   transition-all duration-300 hover:scale-95 px-3 py-2  ${page === "Tshirts" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>TSHIRTS</h4></Link>
          <Link href={"/hoodies"} className={`rounded-lg   transition-all duration-300 hover:scale-95 px-3 py-2  ${page === "Hoodies" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>HOODIES</h4></Link>
          <Link href={"/mugs"} className={`rounded-lg   transition-all duration-300 hover:scale-95 px-3 py-2 ${page === "Mugs" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>MUGS</h4></Link>
          <Link href={"/stickers"} className={`rounded-lg   transition-all duration-300 hover:scale-95 px-3 py-2  ${page === "Stickers" ? "bg-gray-200 " : "hover:bg-gray-200"}`}><h4>STICKERS</h4></Link>



        </div>


        <div className='flex  items-center gap-6'>
          {

            !user.value &&
            <div>

              <Link href={'/login'}><button className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 ' >Login</button></Link>
            </div>
          }
          {
            user.value &&
            <div className='lg:relative '>

              <div onMouseOver={() => { setDropdown(true) }} onMouseOut={() => { setDropdown(false) }} onClick={() => { setDropdown(prevState => !prevState); }} className=' cursor-pointer   p-3 flex items-center justify-center'>
                <MdAccountCircle className='w-[35px] h-[35px] cursor-pointer ' />
              </div>

              {dropdown &&

                <div
                  onMouseOver={() => { setDropdown(true) }}
                  onMouseOut={() => { setDropdown(false) }}
                  className="dropdown bg-gray-100 absolute right-0 max-lg:left-0  px-10  pt-6 pb-4 rounded-lg lg:rounded-tr-none gap-5 flex flex-col shadow-lg shadow-gray-400  z-30"
                >
                  <Link href={"/myaccount"} className='hover:text-[#56E0DD] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Account</h4></Link>
                  <Link href={"/orders"} className='hover:text-[#56E0DD] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Orders</h4></Link>
                  <button onClick={logout} className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 ' >Logout</button>

                </div>

              }

            </div>
          }
          <div className='flex items-center gap-2 cursor-pointer active-while:text-[#56E0DD]' onClick={toggleCart}>
            <IoMdCart className='w-[30px] h-[30px] ' />
            <h4>Cart</h4>
          </div>
        </div>




      </nav>
      <div ref={ref} className={`sidecart fixed overflow-y-auto   top-0  w-[100vw] lg:w-[30vw] md:w-[60vw] h-full right-0 bg-gray-100 pb-36 shadow-lg shadow-gray-400 flex flex-col gap-4 p-5 transform transition-transform max-md:border-t max-md:border-gray-300 z-30 ${(Object.keys(cart).length === 0 || !sidebar) ? `translate-x-full` : `translate-x-0 `} `}  >

        <div className='flex justify-between items-center '>
          <h4 className='font-semibold text-lg'>YOUR CART</h4>
          <AiFillCloseCircle className='cursor-pointer w-8 h-8 text-[#56E0DD] ' onClick={toggleCart} />

        </div>

        {
          Object.keys(cart).length == 0 &&
          <div>Your Cart is empty</div>
        }
        {
          Object.keys(cart).map((k) => {


            return <div key={k} className='flex justify-between items-center'>
              <Link href={"/Product/tshirts"} className=' w-1/2 p-6  bg-gray-300 rounded-xl hover:shadow-lg hover:shadow-gray-500 duration-150 transition-all flex flex-row justify-between items-center'>
                <div>
                  <a className="block relative  rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-top w-1/4 h-full block " src={cart[k].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{cart[k].name}</h3>

                    {cart[k].size &&
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{cart[k].size}/{cart[k].variant}</h3>
                    }

                    <p className="mt-1">₹ {cart[k].price}</p>

                  </div>
                </div>
              </Link>

              <div className="flex flex-col gap-1 items-center pr-2">
                <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer w-5 h-5 ' />
                <h4>{cart[k].qty}</h4>
                <AiFillMinusCircle className='cursor-pointer w-5 h-5 ' onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} />
              </div>
            </div>


          })
        }


        <h3 className="text-gray-800  font-semibold mt-6 text-lg mb-1">Subtotal : ₹ {subTotal}</h3>
        <div className='flex justify-center mt-8 gap-6 max-md:flex-col'>
          <button disabled={Object.keys(cart).length === 0} className=' disabled:bg-gray-400 nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 ' ><Link href={'/checkout'}>Check Out</Link></button>
          <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className='disabled:bg-gray-400 nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 ' >Clear Cart</button>
        </div>

      </div>


    </>

  )
}

export default Navbar;
