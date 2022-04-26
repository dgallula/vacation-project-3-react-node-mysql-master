const mysql = require('mysql')



let con;

if (process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL);
} else {

    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "vacationsdb"
    })
}



// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "vacationsdb"
// })


con.connect(err => {
    if (err) {
        return console.log("🤬", err);
    }
    console.log("connected to mysql server 👌");

})

const SQL = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}


module.exports = { SQL }