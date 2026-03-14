const e = require("express");
const mysql = require("mysql2")

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"agrogestion"
});

conexion.connect((err)=>{
    if (err) {
        console.log("Error BD:", err)
    }
    else{
        console.log("MySQL conectado")
    }
})

module.exports = conexion