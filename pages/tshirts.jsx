import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'


const Tshirts = ({ products }) => {




    return (
        <>
            <Head><title>TechWear - Tshirts</title></Head>


            <section className="text-gray-600 font-livvic min-h-[100vh] lg:px-[8vw] md:pt-52 lg:pt-24 pt-48 pb-12 px-6 " >
                <div className="container px-5 py-12 mx-auto">

                    <div className="flex flex-wrap   gap-3 justify-between">


                        {Object.keys(products.tshirts).map((key) => {
                            const item = products.tshirts[key];


                            return (
                                <div key={item._id} className='lg:w-[17vw] w-full max-lg:gap-8 p-6  bg-gray-300 rounded-xl hover:shadow-lg hover:shadow-gray-500 duration-150 transition-all h-auto font-livvic mb-6'>
                                    <Link href={`${process.env.NEXT_PUBLIC_HOST}/Product/${item.slug}`}>
                                        <div>
                                            <div className=' overflow-hidden flex h-[35vh] justify-center bg-white'>
                                                <img alt="ecommerce" className="object-contain object-center " src={item.img} />
                                            </div>
                                            <div className="mt-4">
                                                <h2 className="text-gray-900 title-font text-base font-medium">{item.title}</h2>
                                                <div className="flex justify-between py-2 items-center ">
                                                    <h3 className="text-gray-500 text-xs tracking-widest ">{item.desc}</h3>
                                                    <p className="">₹{item.price}</p>
                                                </div>
                                                <div className="flex justify-between items-center ">

                                                    <div className="flex gap-1">
                                                        {item.color.includes('red') && <button className="  bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                        {item.color.includes('blue') && <button className="  bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                        {item.color.includes('pink') && <button className="  bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                        {item.color.includes('green') && <button className="  bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                        {item.color.includes('yellow') && <button className="  bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    </div>
                                                    <p className="mt-1 ">{item.size.join(' , ')}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}


                    </div>

                </div>
            </section>

        </>
    )
}


export async function getServerSideProps(context) {



    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/gettshirts`)
    const products = await res.json();


    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}


export default Tshirts;