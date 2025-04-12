require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth.route')
const customerOrderRoute = require('./routes/order.route')
const vendorRoutes = require('./routes/vendor.route')
const analyticsRoutes = require('./routes/anlytics.route')
const connectMongoDB = require('./services/database')

const PORT = process.env.PORT || 5000
const app = express()

// Connect to database
connectMongoDB()

//Global middleware for parsing etc..
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//Route middlewares
app.use('/api', authRouter)
app.use('/api', customerOrderRoute)
app.use('/api', vendorRoutes)
app.use('/api', analyticsRoutes)

//Global err handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
})

app.listen(PORT, () => {
    console.log('listing at localhost:5000');
})