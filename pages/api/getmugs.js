import Product from "@models/Product";
import connectDB from "@middleware/database";



const handler = async(req, res)=> {

    let products = await Product.find({category:"mugs"});

    res.status(200).json({ products })
}


export default connectDB(handler);