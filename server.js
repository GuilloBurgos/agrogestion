require("dotenv").config()
const express = require("express")
const nodemailer = require("nodemailer")

const cors = require("cors")
const db = require("./db")

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/login", (req, res) => {

    const { usuario, password } = req.body

    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?"

    db.query(sql, [usuario, password], (err, result) => {

        if (err) return res.status(500).json(err)

        if (result.length > 0) {
            res.json({
                success: true,
                rol: result[0].rol,
                usuario: result[0].usuario
            })
        } else {
            res.json({ success: false })
        }
    })
})

app.post("/registrar-admin", (req, res) => {

    const { nombre, tipo_documento, num_documento, email, telefono, usuario, password } = req.body

    const sql = `
        INSERT INTO administrador
        (nombre_completo, tipo_documento, num_documento, email, telefono, usuario, password, rol)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'ADMIN')
    `

    db.query(sql, 
        [nombre, tipo_documento, num_documento, email, telefono, usuario, password], 
        (err, result) => {

            if (err) return res.status(500).json(err)

            res.json({ message: "Administrador registrado correctamente" })
        }
    )
})

app.post("/registrar-trabajador", (req, res) => {

    const {
        nombre,
        tipo_documento,
        numero_documento,
        id_tipo_trabajo,
        telefono,
        telefono_familiar,
        direccion,
        fecha_ingreso,
        observaciones
    } = req.body

    const sql = `
        INSERT INTO trabajadores
        (nombre_completo, tipo_documento, numero_documento, id_tipo_trabajo, telefono,
         telefono_familiar, direccion, fecha_ingreso, observaciones)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    db.query(sql,
        [nombre, tipo_documento, numero_documento, id_tipo_trabajo,
         telefono, telefono_familiar, direccion, fecha_ingreso, observaciones],
        (err, result) => {

            if (err) return res.status(500).json(err)

            res.json({ message: "Trabajador registrado correctamente" })
        }
    )
})

app.get("/tipos-trabajo", (req, res) => {

    const sql = "SELECT * FROM tipos_trabajo"

    db.query(sql, (err, result) => {

        if(err) return res.status(500).json(err)

        res.json(result)

    })

})

app.post("/recuperar-password", (req, res) => {

    const { email } = req.body

    const sql = "SELECT * FROM usuarios WHERE email = ?"

    db.query(sql, [email],(err, result) => {

        if (err) return res.status(500).json(err)

        if (result.length === 0) {
            return res.json({ success: false, message: "Correo no encontrado" })
        }

       
        const nuevaPassword = Math.random().toString(36).slice(-8)
        
        const updateSql = "UPDATE usuarios SET password = ? WHERE email = ?"

        db.query(updateSql, [nuevaPassword, email], (err2) => {

            if (err2) return res.status(500).json(err2)

            
            const transporter = nodemailer.createTransport({
                service: "gmail",
                // auth: {
                //     user: "guilloburgos15@gmail.com",
                //     pass: "dbmq lyve bfux wbdd"
                // }

                 auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
                
            })

            const mailOptions = {
                from: "guilloburgos15@gmail.com",
                to: email,
                subject: "Restablecimiento de contraseña - AgroGestion",
                text: `Su nueva contraseña es: ${nuevaPassword}`
            }

            transporter.sendMail(mailOptions, (error, info) => {

                if (error) {
                    console.log(error)
                    return res.status(500).json(error)
                }

                res.json({ success: true, message: "Correo enviado" })
            })

        })
    })
})

app.get("/total-trabajadores",(req,res)=>{

    const sql = "SELECT COUNT(*) AS total FROM trabajadores"

    db.query(sql,(err,result)=>{

        if(err) return res.status(500).json(err)

        res.json(result[0])

    })

})

app.get("/trabajadores-activos",(req,res)=>{

    const sql = "SELECT COUNT(*) AS activos FROM trabajadores WHERE estado='ACTIVO'"

    db.query(sql,(err,result)=>{

        if(err) return res.status(500).json(err)

        res.json(result[0])

    })

})


app.listen(3000,()=>{
    console.log("Servidor en http://localhost:3000")
})