
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Stickers = ({ products }) => {

    return (

        <>
        <Head><title>TechWear - Stickers</title></Head>
        
        <section className="text-gray-600 font-livvic min-h-[100vh] lg:px-[8vw] md:pt-52 lg:pt-24 pt-48 pb-12 px-6" >
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap   gap-3 justify-between">


                    {products.products.map((item) => {
                        
                        


                        return (
                            <div key={item._id} className='lg:w-[17vw] w-full max-lg:gap-8 p-6  bg-gray-300 rounded-xl hover:shadow-lg hover:shadow-gray-500 duration-150 transition-all h-auto font-livvic mb-5'>
                                <Link href={`/Mugs/${item.slug}`}>
                                    <div>
                                        <div className=' overflow-hidden flex h-[35vh] justify-center bg-white'>
                                            <img alt="ecommerce" className="object-contain object-center " src={item.img} />
                                        </div>
                                        <div className="mt-4">
                                            <h2 className="text-gray-900 title-font text-base font-medium">{item.title}</h2>
                                            <div className="flex flex-col justify-between py-2 gap-3 ">
                                                <h3 className="text-gray-500 text-xs tracking-widest ">{item.desc}</h3>
                                                <p className="">₹{item.price}</p>
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstickers`)
    const products = await res.json();
    console.log(products)

    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}


export default Stickers;
