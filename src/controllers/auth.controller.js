const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    const { username, email, password, role } = req.body
    try {
        const isUserExists = await userModel.findOne({email})
        if(isUserExists){
            return res.status(403).send({message: "User already registerd, Please login"})
        }
        const hassedPassword = await bcrypt.hash(password, 10)

        const savedUser = await userModel.create({ ...req.body, password: hassedPassword })
        return res.status(201).send(savedUser)
    }
    catch (error) {
        return res.status(500).send({ message: "Something broke, Try after sometime" })

    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: "No user found, Please signup before login" })
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(401).send({ message: "Wrong Credentials" })
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).send({token})
    }
    catch (error) {
        return res.status(500).send({ message: "Something broke, Try after sometime" })
    }
}

module.exports = {
    signup,
    login
}