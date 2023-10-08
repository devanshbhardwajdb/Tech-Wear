
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import mongoose from "mongoose";
import Product from "@models/Product";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import A1 from "@/anime4.json"
import A2 from "@/anime5.json"
import Error from 'next/error';




const Post = ({ buyNow, addToCart, product, variants, error }) => {
  const router = useRouter();
  const slug = router.query.slug;
  const [pin, setPin] = useState("");
  const [service, setService] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();

  const colorArray = ['pink', 'blue', 'green', 'red', 'yellow', 'black', 'purple', 'voilet', 'indigo', 'navy'];
  const sizeArray = ['S', 'M', 'L', 'XL', 'XXl'];


  useEffect(() => {
    if (!error) {


      setColor(product.color)
      setSize(product.size)
    }

  }, [router.query])




  const checkServicabiltiy = async (e) => {
    e.preventDefault();
    try {

      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      let pinsjson = await pins.json();




      if (Object.keys(pinsjson).includes(pin)) {
        setService(true);
        toast.success('Pincode is servicable', {
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
        setService(false);
        toast.error('Sorry! pincode not servicable', {
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
    } catch (error) {
      console.log("yeh error agya bhai ", error)

    }
  }


  const refreshVariants = (newcolor, newsize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/Product/${variants[newcolor][newsize]['slug']}`
    
    router.push(url)
  }

  if (error == 404) {
    return(

    <div className="text-gray-600  overflow-hidden max-sm:pt-24 max-lg:pt-24 flex  items-center justify-center min-h-[100vh] font-livvic">
      <Lottie animationData={A2} loop={true} className='w-[40vw] ' />
      
    </div>

    )
  }



  return (
    <>
      <div>
        <section className="text-gray-600 body-font overflow-hidden max-sm:pt-24 max-lg:pt-24 min-h-[100vh] font-livvic">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
              <div className='w-1/2 justify-center flex'>
                <img alt="ecommerce" className="lg:w-1/2    object-contain object-center rounded" src={product.img} />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">TechWear</h2>
                <h1 className="text-gray-900 text-3xl font-medium mb-1">{product.title} - {product.size}/{product.color}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#56E0DD]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#56E0DD]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#56E0DD]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#56E0DD]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-[#56E0DD]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.desc}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 ">
                  <div className="flex gap-1">
                    <span className="mr-3">Color</span>

                    {colorArray.map((item) => {


                      return (Object.keys(variants).includes(item) && Object.keys(variants[item]).includes(size)) && <button key={item} onClick={(e) => { refreshVariants(item, size) }} className={`border-2 rounded-full w-6 h-6 focus:outline-none bg-${item}-500 ${color === item ? 'border-black' : 'border-gray-200'}`}></button>

                    })

                    }

                  </div>
                  <div className="flex ml-6 items-center ">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select value={size} onChange={(e) => { refreshVariants(color, e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-[#56E0DD] text-base pl-3 pr-10">
                        {sizeArray.map((item) => {

                          return ((color && Object.keys(variants[color]).includes(item)) && <option key={item} value={item}>{item}</option>)
                        })
                        }


                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>


                {product.availableQty <= 0
                  ?
                  <div className='flex   items-center'>
                    <Lottie animationData={A1} loop={true} className='w-36 ' />
                    <h2 className='font-semibold text-2xl text-black'>Out of Stock!!!</h2>
                  </div>
                  :

                  <div className="flex gap-5 border-b border-gray-300 pb-4 max-md:flex-col ">
                    <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                    <div className='flex gap-3 '>
                      <button
                        onClick={() => { addToCart(slug, 1, product.price, `${product.title}`, size, color, product.img) }}
                        className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 ' >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => { buyNow(slug, 1, product.price, `${product.title}`, size, color, product.img) }}
                        className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 ' >
                        Buy Now
                      </button>

                      <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>}
                <div className="flex mt-6 gap-2 ">
                  <input
                    type="number"
                    placeholder='Check pincode'
                    className={`border rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#56E0DD] focus:shadow-[#56E0DD] ${(!service && service != null) ? 'border-red-400 shadow-red-400 shadow-sm' : 'border-gray-300 '}`}
                    onChange={(e) => {
                      if (e.target.value.length <= 6) {
                        setPin(e.target.value);
                      }
                    }}
                    value={pin}
                  />
                  <button className='nav-btn  bg-[#56E0DD] text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-gray-300 ' onClick={(e) => { checkServicabiltiy(e) }} >Check</button>

                </div>

                {
                  (!service && service != null) &&
                  <div className='mt-2 text-red-600 font-livvic text-sm font-medium'>
                    <p>Sorry! We do not deliver to this pincode.</p>


                  </div>
                }
                {
                  (service && service != null) &&
                  <div className='mt-2 text-green-600 font-livvic text-sm font-medium'>

                    <p>Hurray! We deliver to this pincode.</p>



                  </div>
                }
              </div>
            </div>
          </div>
        </section >
      </div >
      <ToastContainer
        position="top-right"
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
      {/* Same as */}
      <ToastContainer />
    </>
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




  let product = await Product.find({ slug: context.query.slug })
  console.log(product);

  if (product.length === 0) {
    return { props: { error: 404 } }
  }
  else {
    let variants = await Product.find({ title: product[0].title })

    let colorSizeSlug = {}
    for (let item of variants) {
      if (Object.keys(colorSizeSlug).includes(item.color)) {
        colorSizeSlug[item.color][item.size] = { slug: item.slug }
      }
      else {
        colorSizeSlug[item.color] = {}
        colorSizeSlug[item.color][item.size] = { slug: item.slug }
      }
    }

    return { props: { product: JSON.parse(JSON.stringify(product[0])), variants: JSON.parse(JSON.stringify(colorSizeSlug)) } }
  }

}

export default Post
