


import User from "@models/User";
import connectDB from "@middleware/database";
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    
    const { address, pincode, city, state, userData } = req.body;




    try {


        await User.findOneAndUpdate(
            { email: userData.email },
            { address: address, pincode: pincode, city: city, state: state }
        );

        let token = jwt.sign({ email: userData.email, name: userData.name, phone: userData.phone, address:address, city: city, state: state, pincode: pincode }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        })


        return res.status(200).json({ success: true, token });





    } catch (error) {
        console.error('Your address was not updated', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default connectDB(handler);
