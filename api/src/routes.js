const express = require('express');
const routes = express.Router();
const MedController = require('./controllers/Med');
const EspController = require('./controllers/Esp');

routes.get('/med',MedController.index);
routes.get('/med/:id',MedController.show);
routes.post('/med',MedController.store);
routes.put('/med/:id',MedController.update);
routes.post('/med/:id',MedController.destroy);

routes.get('/esp',EspController.index);
routes.get('/esp/:id',EspController.show);
routes.post('/esp',EspController.store);
routes.put('/esp/:id',EspController.update);
routes.post('/esp/:id',EspController.destroy);

routes.get('/',(req,res)=>{
    return res.send("Bem-vindo aos Medicos")
});

module.exports = routes;


