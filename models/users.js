const pool = require("../configs/db");


class UserModel {

    //สร้างผู้ใช้ใหม่
    static async CreateUser(name,email,password) {
        const [result] = await pool.query("Insert into users (name,email,password) values (?,?,?) ",[name,email,password]);
        return result.insertId;
    }
    //อัพเดทข้อมูลผู้ใช้
    static async UpdateUser(id,name,email) {
        const [result] = await pool.query("update users SET  name = ? , email = ? where id = ?",[name,email,id]);
        return result.affectedRows;
    }
    //ลบผู้ใช้
    static async DeleteUser(id) {
        const [result] = await pool.query("delete from users where id = ?",[id]);
        return result.affectedRows;
    }
    //ดึงข้อมูลผู้ใช้ทั้งหมด
    static async GetAllusers() {
        const [rows] = await pool.query("Select id,email,name from users");
        return rows;
    }
    //ดึงข้อมูลตาม ID 
    static async GetUserByID(id) {
        const [rows] = await pool.query("Select name,email from users where id = ?",[id]);
        return rows[0];
    }
}

module.exports = UserModel;






