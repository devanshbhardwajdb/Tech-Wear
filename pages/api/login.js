import User from "@models/User";
import connectDB from "@middleware/database";
var CryptoJS = require("crypto-js")
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    // console.log(req.body)
    try {
        if (req.method === 'POST') {



            let user = await User.findOne({ "email": req.body.email });


            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);

            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

            if (user) {

                if (req.body.email == user.email && req.body.password == decryptedPass) {
                    var token = jwt.sign({ email: user.email, name: user.name, phone: user.phone, address: user.address, city: user.city, state: user.state, pincode: user.pincode }, process.env.JWT_SECRET, {
                        expiresIn: '2d'
                    })

                    res.status(200).json({ success: true, token })

                }
                else {

                    res.status(200).json({ success: false, error: "Invalid credentials" })
                }
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



