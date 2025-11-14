const pool = require("../configs/db");

class orderModel {

    static async CreateOrder(customer_id,totalPrice) {
        const [result] = await pool.query("Insert into orders (customer_id,status,totalPrice) VALUES (?,?,?)",[customer_id,"pending",totalPrice]);
        return result.insertId;
    }

    static async UpdateOrder(id,totalPrice) {
        const [result] = await pool.query("Update orders SET totalPrice = ? where id=?",[totalPrice,id]);
        return result.affectedRows;
    }

    static async AddOrderItem(order_id,product_id,price,quantity) {
        const [result] = await pool.query("Insert into order_items (order_id,product_id,price,quantity) VALUES (?,?,?,?)",[order_id,product_id,price,quantity]);
        return result.insertId;
    }

    static async UpdateOrderItem(id,quantity) {
        const [result] = await pool.query("Update order_items SET quantity = ? where id=?",[quantity,id]);
        return result.affectedRows;
    }

    static async DeleteOrder(id) {
        const [delOrder] = await pool.query("DELETE FROM orders WHERE id=?",[id]);
        const [delOrderItem] = await pool.query("DELETE FROM order_items WHERE order_id =?",[id]);
        return {
            deletedOrders: delOrder.affectedRows,
            deletedOrderItems: delOrderItem.affectedRows
        };
    }

    static async CusViewOrder(customer_id) {
        const [orders] = await pool.query(
            "SELECT id, status, TotalPrice FROM orders WHERE customer_id = ?",
            [customer_id]
        );
    
        let Result = [];
    
        for (const order of orders) {
            const [items] = await pool.query(
                `SELECT p.name, oi.quantity
                 FROM order_items oi
                 JOIN products p ON oi.product_id = p.id
                 WHERE oi.order_id = ?`,
                [order.id]
            );
    
            Result.push({
                order_id: order.id,
                status: order.status,
                total_price: order.TotalPrice,
                items: items
            });
        }
    
        return Result;
    }
    

    static async SellViewOrder(seller_id) {
        const [rows] = await pool.query(
          `SELECT p.name as product_name, oi.order_id, oi.quantity
           FROM products p
           JOIN order_items oi ON p.id = oi.product_id
           WHERE p.seller_id = ?`,
          [seller_id]
        );
        return rows;
      }
}

module.exports = orderModel;