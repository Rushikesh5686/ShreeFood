const express = require('express')
const router = express.Router()
const user = require('../models/user.js')
const { body, validationResult } = require('express-validator')
const bcrypt= require("bcryptjs")
const jwt =require("jsonwebtoken")
const jwtSecret ="Rushi"
router.post('/creatuser',
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 }),




    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt =await bcrypt.genSalt(10)
        let secpassword =await bcrypt.hash(req.body.password,salt)
        try {
            await user.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })


router.post('/loginuser', [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email;
        try {
            let useremail = await user.findOne({ email })
            if (!useremail) {
                return res.status(400).json({ errors: "try loggin with correct credential" })
            }
            const pwdCompare= await bcrypt.compare(req.body.password,useremail.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "try loggin with correct credential" })
            }
            const data={
                user:{
                    id:useremail.id
                }
            }
            const authToken =jwt.sign(data,jwtSecret)


            return res.json({ errors: true, authToken: authToken })
        }
        catch (error) {
            res.json({ success: false })
        }
    })

module.exports = router