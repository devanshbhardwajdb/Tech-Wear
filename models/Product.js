import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";


const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    slug: {
        type: String,
        required: true,
        unique: true,

    },
    desc: {
        type: String,
        required: true,

    },
    img: {
        type: String,
        required: true,

    },
    category: {
        type: String,
        required: true,

    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: true,

    },
    availableQty: {
        type: Number,
        required: true,

    },


}, { timestamps: true });



const Product = models.Product || model('Product', ProductSchema);

export default Product;