import Product from "@models/Product";
import connectDB from "@middleware/database";



const handler = async (req, res) => {

    try {
        if (req.method === 'POST') {
            

            for (let i = 0; i < req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                })
                await p.save();
            }
            res.status(200).json({ success: "Adding product was successful" })
        }
        else {
            res.status(400).json({ error: "This method is not defined" })
        }

    } catch (error) {
        console.log("add products mein error agya hai",error);
        res.status(500).json({ error: "An error occurred while adding products" });


    }


}


export default connectDB(handler);



