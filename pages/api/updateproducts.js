import Product from "@models/Product";
import connectDB from "@middleware/database";



const handler = async (req, res) => {

    try {
        if (req.method === 'POST') {
            

            for (let i = 0; i < req.body.length; i++) {
                let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
                
            }
            res.status(200).json({ success: "Updating product was successful" })
        }
        else {
            res.status(400).json({ error: "This method is not defined" })
        }

    } catch (error) {
        console.log("update products mein error agya hai",error);
        res.status(500).json({ error: "An error occurred while updating products" });


    }


}


export default connectDB(handler);



