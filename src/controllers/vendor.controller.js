const productModel = require("../models/product.model")

const addProduct = async (req, res, next) => {
    try {
        const newProduct = await productModel.create({ ...req.body, vendorId: req.user._id })
        return res.status(201).send(newProduct)
    }
    catch (error) {
        return res.status(500).send({ message: "Something broke, PLese try after sometime" })
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const isProductFound = await productModel.findOne({ _id: id })
        // console.log(isProductFound);
        // console.log(req.user);
        if (!isProductFound) {
            return res.status(404).send({ message: "No product found" })

        }
        if (isProductFound.vendorId.toString() != req.user._id) {
            return res.status(401).send({ message: "Unauthorized acccess" })

        }
        const newProduct = await productModel.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true })
        return res.status(200).send(newProduct)
    }
    catch (error) {
        return res.status(500).send({ message: "Something broke, PLese try after sometime" })
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const isProductFound = await productModel.findOne({ _id: id })
        if (!isProductFound) {
            return res.status(404).send({ message: "No product found" })

        }
        if (isProductFound.vendorId.toString() != req.user._id) {
            return res.status(401).send({ message: "Unauthorized acccess" })

        }
        const newProduct = await productModel.findByIdAndDelete({ _id: id })
        // console.log('newproduct', newProduct);
        return res.status(200).send({ message: 'This product deleted successfully' })
    }
    catch (error) {
        return res.status(500).send({ message: "Something broke, PLese try after sometime" })
    }
}

const getAllProductsByVendor = async (req, res, next) => {
    try {
        const _id = req.user._id
        const products = await productModel.find({ vendorId: _id })
        return res.status(200).send(products)
    }
    catch (error) {
        return res.status(500).send({ message: "Something broke, PLese try after sometime" })
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProductsByVendor
}