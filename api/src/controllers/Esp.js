const mysql = require('mysql');
const credencias = require('../config/MysqlConfig');
var connection = mysql.createConnection(credencias);

connection.connect();

module.exports = {
    async index(req, res) {
      const medicos = await connection.query('SELECT * FROM esp_modalidade',function(err,results){
            if(err) throw error;
            res.send(results.map(item => ({"id":item.esp_id,"nome":item.esp_nome_mod})));
        });
     
        // console.log(medicos);
    },

    async show(req, res) {
        let data =  parseInt(req.params.id);
        let sql = "SELECT * FROM esp_modalidade WHERE esp_id = ?";
        let query = connection.query(sql,data,(err,results)=>{
            if(err) throw err;
            res.send(results);
        });
        // console.log(query);
    },

    async store(req, res) {
        let data ={esp_nome_mod:req.body.nome};
        let sql = "INSERT INTO esp_modalidade SET ?";
        let query = connection.query(sql, data,(err, results) => {
            if(err) throw err;
            return res.json('Cadastro com sucesso');
          });
    },

    async update(req, res) {
        let sql = "UPDATE esp_modalidade SET esp_nome_mod='"+req.body.nome+"'WHERE esp_id="+req.body.id;
        let query = connection.query(sql, (err, results) => {
          if(err) throw err;
          return res.json('Atualizado com sucesso');
        });
    },

    async destroy(req, res) {
        let data =  parseInt(req.params.id);
        let sql = "DELETE FROM esp_modalidade WHERE esp_id= ?";
        let query = connection.query(sql,data,(err, results) => {
        if(err) throw err;
            return res.json('Deleted');
        });
    }
}