const express = require('express');
const router = express.Router();
const order= require('../models/orders')
router.post('/orderdata', async (req, res) => {
    const { email, order_date, order_data } = req.body;

    // Input validation
    if (!email || !order_date || !order_data || !Array.isArray(order_data)) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    const data = [{ order_data: order_date }, ...order_data]; // Create a new array with the order_date prepended

    try {
        const existingOrder = await order.findOne({ email });

        if (!existingOrder) {
            // If no existing order, create a new one
            await order.create({
                email,
                order_data: [data],
            });
            return res.json({ success: true });
        } else {
            // If an order exists, update it
            await order.findOneAndUpdate(
                { email },
                { $push: { order_data: data } }
            );
            return res.json({ success: true });
        }
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/myorderdata', async (req,res)=>{
    try{
        let mydata= await order.findOne({email:req.body.email})
        res.json({orderdata: mydata})
    }catch(error){
        res.send("SErver error")
    }
})

module.exports = router;
