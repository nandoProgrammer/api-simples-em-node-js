const express = require('express');
const server = express();

server.use(express.json());


let customers = [];


//Create
server.post("/customers", (req, res) => {
   const { name } = req.body;
   let id;

   if(customers.length > 0){
      id = customers[customers.length - 1].id + 1;
   }else{
      id = 0;
   }
   
 
   const newCustomer = { id, name };
   customers.push(newCustomer);
 
   return res.status(200).json(customers);
});



//Read
server.get('/customers', (req, res) => {
   return res.json(customers);
});



//Read for id
server.get('/customers/:id', (req, res) => {
   const id = parseInt(req.params.id);
   const customer = customers.find(item => item.id === id);
   const status = customer ? 200 : 404;
   
   if(status === 200){
      return res.status(status).json(customer);
   }else{
      return res.status(status).json("Cliente não encontrado");
   }
   
});



//Update
server.put("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if(index >= 0){
       customers[index] = { id: parseInt(id), name };
    }
    
    if(status === 200){
      return res.status(status).json(customers);
    }else{
      return res.status(status).json("Cliente não encontrado")
    }
});



//Delete 
server.delete('/customers/:id', (req, res) => {
     const id = parseInt(req.params.id);

     const index = customers.findIndex(item => item.id === id);
     const status = index >= 0 ? 200 : 404;

     if(index >= 0){
        customers.splice(index, 1);
     }

     if(status === 200){
        return res.status(status).json(customers);
     }else{
        return res.status(status).json("Cliente não encontrado")
     }
});



server.listen('3000');