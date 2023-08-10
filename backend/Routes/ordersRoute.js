const express = require('express');
const router = express.Router();
const order = require('../models/Orders');

router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data;

    data.splice(0, 0, {Order_date: req.body.order_date})

    let eId = await order.findOne({email:req.body.email});
    
    if(eId === null){
        try {
            await order.create({email: req.body.email, order_data: [data]});
            await res.status(200).json({success:true})
        } catch (error) {
            console.log('this is the error', error)
        }
    }
    else{
        try {
           await order.findOneAndUpdate({email:req.body.email}, {$push : {order_data : data}});
           await res.status(200).json({success:true});
            
        } catch (error) {
            res.send("Server Error", error.message);
        }
    }
});

router.post('/myorders', async (req, res) => {
     try {
        const email = req.body.email;
        let myData = await order.findOne({email});
        // let x = myData.order_data;
        // console.log(x);
        res.status(200).json({orderData:myData});
     } catch (error) {
        res.send("Server Error", error.message);
     }
    
})


module.exports = router;