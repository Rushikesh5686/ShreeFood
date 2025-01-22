 
const express = require('express')
const router = express.Router()

router.post('/fooddata',(req,res)=>{
    try{
        console.log(global.food_item)
        res.send([global.food_item,global.foodCategory])
    }catch (error){
        console.log(error)
    }
})
module.exports =router
