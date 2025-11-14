const pool  = require("../configs/db");
const orders = require("../models/orders");
const products = require("../models/products");

const CreateOrder = async(req,res) => {
    const {productID,quantity} = req.body; //รับ id สินค้าและจำนวน
    const customerID = req.user.id; //เช็คว่าลูกค้าคือใคร

    try{
    const detailProduct = await products.GetDetailProduct(productID); //ดึงข้อมูลสินค้าทั้งหมดด้วย id สินค้า
    const [pendingOrder] = await pool.query(`SELECT id FROM orders WHERE customer_id=? AND status = "pending" `,[customerID]) // ดึง id order ของลูกค้าที่ยังมีสถานะ pending
    
    //ถ้าลูกค้าไม่มี order ที่มีสถานะ pending
    if(pendingOrder.length === 0){
        const totalPrice = Number(detailProduct[0].price)*Number(quantity); //ราคารวม
        const newOrder = await orders.CreateOrder(customerID,totalPrice); //สร้าง order ใหม่
        const addOrderItem = await orders.AddOrderItem(newOrder,productID,detailProduct[0].price,quantity); //สร้างรายสินค้าใน order ใหม่
        return res.status(201).json({message:"Created new order successully"})  //จบ function
    }
    //ถ้าลูกค้ามี order ที่มีสถานะ pending อยู่แล้ว
    const [oldOrderItem] = await pool.query("SELECT id,quantity FROM order_items WHERE order_id =? AND product_id = ?",[pendingOrder[0].id,detailProduct[0].id]); //ดึง id,จำนวนสินค้าเดิมที่มีรายการอยู่แล้วใน order เดิม
    //ถ้าใน order เดิม ไม่มีสินค้านี้ 
    if(oldOrderItem.length === 0) {
        const addOrderItem = await orders.AddOrderItem(pendingOrder[0].id,detailProduct[0].id,detailProduct[0].price,quantity);
    }
    else{
        const updateOrderItem = await orders.UpdateOrderItem(oldOrderItem[0].id,quantity);
    }
    const [totalPrice] = await pool.query("SELECT SUM(price*quantity) AS totalPrice FROM order_items WHERE order_id = ?",[pendingOrder[0].id]); //อัพเดทราคารวม
    const UpdateOrder = await orders.UpdateOrder(pendingOrder[0].id,totalPrice[0].totalPrice); //อัพเดท order
    return res.status(201).json({message:"Update order successfully"});
    }
    catch(error){
        console.error("Error to create or update order : ",error);
        res.status(500).json({message:"Failed to create or update order"});
    }

}

const viewOrder = async(req,res) => {
    const ID = req.user.id;
    const role = req.user.role;

    try{
        let result;
        if(role === "customer"){
            result = await orders.CusViewOrder(ID);
        }
        if(role === "seller"){
            result = await orders.SellViewOrder(ID);
        }
        res.status(200).json({message:"Orders retrieved successfully",data:result});
    }
    catch(error){
        console.error("Error to get all order : ",error);
        res.status(500).json({message:"Failed to get all order"});
    }
}

const deleteOrder = async(req,res) => {
    const {id} = req.params;
    try{
        await orders.DeleteOrder(id);
        res.status(200).json({message:"Delete order succesfully"})
    }

    catch(error){
        console.error("Error to delete order : ",error);
        res.status(500).json({message:"Failed to delte order"});
    }
}

module.exports = {CreateOrder,viewOrder,deleteOrder};

