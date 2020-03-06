const mysql = require('mysql');
const credencias = require('../config/MysqlConfig');
var connection = mysql.createConnection(credencias);

connection.connect();

module.exports = {
    async index(req, res) {
      const medicos = await connection.query("SELECT * FROM MedicoS",function(err,results){
            if(err) throw error;
            res.send(results.map(item => ({"CRM":item.med_CRM,"Nome":item.med_nome,"Telephone":item.med_tel,"Estado":item.med_estado,"Cidade": item.med_cidade,"Especialidades":item.esp_nome_mod})));
        });
        //  console.log(medicos);
    },

    async show(req, res) {
        let data =  parseInt(req.params.id);
        let sql = "SELECT * FROM MedicoS WHERE med_CRM= ?";
        let query = await connection.query(sql,data,(err,results)=>{
            if(err) throw err;
            res.send(results);
        });
        // console.log(query);
    },

    async store(req, res) {
        let data_med ={med_CRM:req.body.CRM,  med_nome:req.body.Nome,  med_tel:req.body.Telephone,  med_estado:req.body.Estado,  med_cidade:req.body.Cidade};
        let data_med_esp = {med_esp_CRM: req.body.CRM,  med_esp_id:req.body.Especialidade}; // Lembrando que o Usuario tem que cadastar com o ID da ESPECIALIDADE

        let sql_1 = "INSERT INTO med_medicos SET ?";
        let sql_2 = "INSERT INTO med_esp_medicos_especialidades SET ?";

        let query_1 = await connection.query(sql_1, data_med,(err, results) => {
            if(err) throw err;
        });

        let query_2 = await connection.query(sql_2, data_med_esp,(err, results) => {
            if(err) throw err;
            // return res.json('Especialidade Cadastrado na sua Tabela');
        });

        return res.json('Medico cadastrado');
       
    },

    async update(req, res) {
        let sql = "UPDATE med_medicos SET med_nome='"+req.body.Nome+"',med_tel='"+req.body.Telephone+"',med_estado='"+req.body.Estado+"',med_cidade='"+req.body.Cidade+"' WHERE med_CRM="+req.params.id;
        let sql_1 = "UPDATE med_esp_medicos_especialidades SET med_esp_id='"+req.body.Especialidade+"' WHERE med_esp_CRM="+req.params.id;
        let query = await connection.query(sql, (err, results) => {
          if(err) throw err;
        });
        let query_1 = await connection.query(sql_1,(err,results)=>{
           if(err) throw err;
        });
        return res.json('Atualizado com sucesso');
    },

    async destroy(req, res) {
        let data =  parseInt(req.params.id);
        let sql_1 = "DELETE FROM med_esp_medicos_especialidades WHERE med_esp_CRM=?";
        let sql_2 = "DELETE FROM med_medicos WHERE med_CRM= ?";
        
        let query_1 = await connection.query(sql_1,data,(err, results) => {
        if(err) throw err;
        });

        let query_2 = await connection.query(sql_2,data,(err, results) => {
            if(err) throw err;
        });

        return res.json('Deleted');
    }
}