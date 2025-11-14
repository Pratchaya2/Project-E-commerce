const pool = require("../configs/db");


class UserModel {

    //สร้างผู้ใช้ใหม่
    static async CreateUser(name,email,password) {
        const [result] = await pool.query("Insert into users (name,email,password,role) values (?,?,?,?) ",[name,email,password,"customer"]);
        return result.insertId;
    }
    //อัพเดท role ผู้ใช้
    static async UpdateRole(id,role) {
        const [result] = await pool.query("update users SET role = ? where id = ?",[role,id]);
        return result.affectedRows;
    }
    //ลบผู้ใช้
    static async DeleteUser(id) {
        const [result] = await pool.query("delete from users where id = ?",[id]);
        return result.affectedRows;
    }
    //ดึงข้อมูลผู้ใช้ทั้งหมด
    static async GetAllusers() {
        const [rows] = await pool.query("Select id,email,name,role from users");
        return rows;
    }
    //ดึงข้อมูลด้วย Email สำหรับ Login 
    static async GetUserByEmail(email) {
        const [rows] = await pool.query("Select * from users where email = ?",[email]);
        return rows[0];
    }
}

module.exports = UserModel;






