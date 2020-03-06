const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const credencias = require('./config/MysqlConfig');
var connection = mysql.createConnection(credencias);

// connection.connect();
connection.connect(function(err){
    if(err)throw err;
    console.log("Connectado!");
});

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);
// app.listen(process.env.PORT || 5000);
app.listen(5000);


