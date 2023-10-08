import User from "@models/User";
import connectDB from "@middleware/database";
var CryptoJS = require("crypto-js")
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    

    const phone = parseInt(req.body.phone)

    
    try {
        if (req.method === 'POST') {

            let user = await User.findOne({ phone: phone });

            if (user) {
                res.status(200).json({ success: true })

            }
            else {
                res.status(200).json({ success: false, error: "No user found" })
            }
        }
        else {
            res.status(400).json({ error: "This method is not defined" })
        }

    } catch (error) {
        console.log("user added to database", error);
        res.status(500).json({ error: "An error occurred" });


    }


}


export default connectDB(handler);



