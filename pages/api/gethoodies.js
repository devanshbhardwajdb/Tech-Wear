import Product from "@models/Product";
import connectDB from "@middleware/database";



const handler = async(req, res)=> {

    let products = await Product.find({category:"hoodies"});


    let hoodies = {}
    for (let item of products){
        if(item.title in hoodies){
            if(!hoodies[item.title].color.includes(item.color) && item.availableQty > 0){
                hoodies[item.title].color.push(item.color)
            }
            if(!hoodies[item.title].size.includes(item.size) && item.availableQty > 0){
                hoodies[item.title].size.push(item.size)
            }

        }
        else{
            hoodies[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                hoodies[item.title].color = [item.color]
                hoodies[item.title].size = [item.size]
            }
            else{
                hoodies[item.title].color = []
                hoodies[item.title].size = []
            }
        }
    }

    res.status(200).json({ hoodies })
}


export default connectDB(handler);