const pool  = require("../configs/db");

class productsModel {

    static async CreateProduct(seller_id,name,price,description,stock,category) {
        const [result] = await pool.query("Insert into products (seller_id,name,price,description,stock,category) values(?,?,?,?,?,?)",[seller_id,name,price,description,stock,category]);
        return result.insertId;
    }

    static async UpdateProduct(id,name,price,description,stock,category) {
        const [OldData] = await pool.query("SELECT * FROM products WHERE id = ?",[id]);
        //สร้างตัวแปร newdata มาเพื่อแก้ปัญหา null ในกรณีที่ไม่ได้ส่งข้อมูลเข้ามาอัพเดท
        const NewData = {
            name: name ?? OldData[0].name,
            price: price ?? OldData[0].price,
            description: description ?? OldData[0].description,
            stock: stock ?? OldData[0].stock,
            category: category ?? OldData[0].category
        }
        const [result] = await pool.query("Update products SET name=?,price=?,description=?,stock=?,category=? where id=?",[NewData.name,NewData.price,NewData.description,NewData.stock,NewData.category,id]);
        return result.affectedRows;
    }

    static async DeleteProduct(id) {
        const [result] = await pool.query("Delete from products where id=?",[id]);
        return result.affectedRows;
    }

    static async Getmyproduct (seller_id) {
        const [result] = await pool.query("Select * from products where seller_id=?",[seller_id]);
        return result;
    }

    static async GetAllProducts () {
        const [result] = await pool.query("SELECT * FROM products");
        return result;
    }


    static async GetDetailProduct (id) {
        const [result] = await pool.query("Select * from products where id=?",[id]);
        return result;
    }

    static async SearchProduct (name,category,minPrice,maxPrice){
        let sql = "SELECT * FROM e_commerce_system.products WHERE 1=1 ";
        let param = [];
        if(name) {
            const trimmed = name.trim();   // ตัดช่องว่างหัวท้าย
            sql += " AND name LIKE ?";
            param.push(`%${trimmed}%`);
        }
        if(category) {
            const trimmed = category.trim();
            sql += "AND category = ?";
            param.push(category);
        }
        if(minPrice){
            const trimmed = minPrice.trim(); 
            sql += " AND price >= ?";
            param.push(minPrice);
        }
        if(maxPrice){
            const trimmed = maxPrice.trim(); 
            sql += " AND price <= ?";
            param.push(maxPrice);
        }
        const [result] = await pool.query(sql,param);
        return result;
    }
}

module.exports = productsModel;