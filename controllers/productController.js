const pool = require("../configs/db");
const products = require("../models/products");

const NewProduct = async(req,res) => {
    const {name,price,description,stock,category} = req.body;
    const seller_id = req.user.id;

    if(!name||!price||!description||!stock||!category){
        return res.status(400).json({message:"name,price,description,stock,category are required"});
    }

    try{
        await products.CreateProduct(seller_id,name,price,description,stock,category);
        res.status(201).json({message:"Add product successfully"})
    }

    catch(error){
        console.error("Error to add new product : ",error);
        res.status(500).json({message:"Failed to add new product"});
    }
}

const UpdateProduct = async(req,res) =>{
    const {id} = req.params;
    const {name,price,description,stock,category} =req.body;

    try{
        row = await products.UpdateProduct(id,name,price,description,stock,category);
        if(row===0){
            return res.status(400).json({message:"No product"})
        }
        res.status(200).json({message:"Update product succesfully"})
    }

    catch(error){
        console.error("Error to update product : ",error);
        res.status(500).json({message:"Failed to update product"});
    }
}

const DeleteProduct = async(req,res) => {
    const {id} = req.params;
    try{
        await products.DeleteProduct(id);
        res.status(200).json({message:"Delete product sucessfully"});
    }
    catch(error){
        console.error("Error to delete product : ",error);
        res.status(500).json({message:"Failed to delete product"});
    }
}

const Getmyproduct = async(req,res) => {
    const seller_id = req.user.id //ได้จาก JWT middleware
    
    try{
        const AllProducts = await products.Getmyproduct(seller_id);
        return res.status(201).json({message:"Products retrieved successfully :",data:AllProducts});
    }

    catch(error){
        console.error("Error to retrieved your products : ",error);
        res.status(500).json({message:"Failed to retrieved your products"});
    }

}

const GetAllProducts = async(req,res) => {
    try{
        const AllProducts = await products.GetAllProducts();
        return res.status(201).json({message:"Products retrieved successfully",data:AllProducts});
    }

    catch(error){
        console.error("Error to retrieve all product : ",error);
        res.status(500).json({message:"Failed to retrieve all product"});
    }
}

const GetDetailProduct = async(req,res) =>{
    const {ID} = req.params;

    try{
        const Product = await products.GetDetailProduct(ID);
        if (Product.length === 0) {
            return res.status(404).json({ message: "Product no found" });
          }
        res.status(200).json({message:"Here detail product :",Product:Product[0]});
    }

    catch(error){
        console.log("Error to get detail product",error);
        res.status(500).json({message:"Failed to get detail product"});
    }
}

const SearchProduct = async(req,res) => {
    const {name,category,minPrice,maxPrice} = req.query;
    console.log("🔍 Query Input:", {name, category, minPrice, maxPrice}); // <---- เช็คค่าที่ส่งมา
    try {
        const result = await products.SearchProduct(name,category,minPrice,maxPrice);
        console.log("📦 SQL Result:", result); // <---- ดูว่าคืนค่ามาเป็นอะไร
        if(result.length === 0){
            return res.status(404).json({message:"Product not fo"})
        }
        res.status(200).json({message:"Succesfully",Product:result})
    }
    catch(error){
        console.log("Error to search product",error);
        res.status(500).json({message:"Failed to search product"});
    }
}

module.exports = {NewProduct,UpdateProduct,DeleteProduct,Getmyproduct,GetAllProducts,GetDetailProduct,SearchProduct}