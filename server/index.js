//imports
 
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const { SQL } = require('./db/dbconfig')


//initialization
const app = express()
const port = process.env.PORT || 1000


app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
 
app.use(express.json())
 
app.use(session({
    secret:"myProject",
    name:"session",
    saveUninitialized: true,
    resave:true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24
    } 
}))
 

app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))
app.use('/admin', require('./routes/admin'))

app.get('/' ,async (req,res) => {
    const userss = await SQL(`SELECT * FROM users WHERE role="admin"`)
    try {
        console.table(userss)
        res.send(userss)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
    
})
 
 

 
app.listen(port, ()=> console.log("Sercer connected/Port 1000 "))


