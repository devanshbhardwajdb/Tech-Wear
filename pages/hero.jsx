import React from 'react'
import Link from 'next/link'
import Head from 'next/head'


const Hero = () => {
    return (
        <div>
            <Head><title>TechWear</title></Head>
            <section className="text-gray-600 font-livvic lg:pt-10 pt-40  ">
                <div className="container px-5 py-24 mx-auto ">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center ">
                        <h1 className="sm:text-6xl text-3xl font-bold title-font mb-2 text-gray-900 ">Welcome to TechWear</h1>
                        <p className="lg:w-1/2 w-full  sm:text-xl text-lg leading-relaxed text-gray-900">Fall in love with tech through our products</p>
                    </div>
                    <div className="flex flex-wrap   gap-3 justify-between">
                        <div className='lg:w-[17vw] w-full max-lg:gap-8 p-6  bg-gray-200 backdrop-blur-lg rounded-xl shadow-lg shadow-gray-500 hover:scale-105  duration-200 transition-all h-auto font-livvic mb-6'>
                            <Link href={`${process.env.NEXT_PUBLIC_HOST}/tshirts`}>
                                <div>
                                    <div className=' overflow-hidden flex h-[35vh] justify-center '>
                                        <img alt="ecommerce" className="object-contain object-center " src="https://www.teez.in/cdn/shop/products/Techperiodictabletshirt_1_large.jpg?v=1640676944" />
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <h2 className="text-gray-900  text-lg font-medium">Tech Tshirts</h2>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='lg:w-[17vw] w-full max-lg:gap-8 p-6  bg-gray-200 backdrop-blur-lg rounded-xl shadow-lg shadow-gray-500 hover:scale-105  duration-200 transition-all h-auto font-livvic mb-6'>
                            <Link href={`${process.env.NEXT_PUBLIC_HOST}/hoodies`}>
                                <div>
                                    <div className=' overflow-hidden flex h-[35vh] justify-center '>
                                        <img alt="ecommerce" className="object-contain object-center " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJWOlXq1T-DgcQzSSrx_HMgbrdlwQzzblD1w&usqp=CAU" />
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <h2 className="text-gray-900  text-lg font-medium">Tech Hoodies</h2>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='lg:w-[17vw] w-full max-lg:gap-8 p-6  bg-gray-200 backdrop-blur-lg rounded-xl shadow-lg shadow-gray-500 hover:scale-105  duration-200 transition-all h-auto font-livvic mb-6'>
                            <Link href={`${process.env.NEXT_PUBLIC_HOST}/mugs`}>
                                <div>
                                    <div className=' overflow-hidden flex h-[35vh] justify-center '>
                                        <img alt="ecommerce" className="object-contain object-center " src="https://rukminim2.flixcart.com/image/416/416/ky3b0y80/mug/e/w/c/ceramic-designer-computer-engg-printed-coffee-cup-mug-for-gift-original-imagaegyqzgck26z.jpeg?q=70" />
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <h2 className="text-gray-900  text-lg font-medium">Tech Mugs</h2>

                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='lg:w-[17vw] w-full max-lg:gap-8 p-6  bg-gray-200 backdrop-blur-lg rounded-xl shadow-lg shadow-gray-500 hover:scale-105  duration-200 transition-all h-auto font-livvic mb-6'>
                            <Link href={`${process.env.NEXT_PUBLIC_HOST}/stickers`}>
                                <div>
                                    <div className=' overflow-hidden flex h-[35vh] justify-center '>
                                        <img alt="ecommerce" className="object-contain object-center " src="https://rukminim2.flixcart.com/image/416/416/kzvlua80/sticker/e/b/s/small-weeks-of-coding-laptop-skin-trackpad-vinyl-decal-stickers-original-imagbs6zqj2fzp2g.jpeg?q=70" />
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <h2 className="text-gray-900  text-lg font-medium">Tech Stickers</h2>

                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>


                </div>
            </section>
        </div>
    )
}

export default Hero
