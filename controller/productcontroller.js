const { Product } = require('../models');
exports.getAllProduct = async(req,res,next)=>{
  try {
    const product = await Product.findAll()
    res.status(200).json({product})
  } catch (err) {
    next(err)
  }
}
exports.updateProduct = async(req,res,next) =>{
  try {
    const {id} = req.params
    const  { productName,price,desc,amount,type } = req.body
    const editProduct = await Product.update(
      {
        productName,
        price,
        desc,
        amount,
        type,
      },
      { where: { id } }
    );
    res.status(200).json({editProduct})
  } catch (err) {
    next(err)
  }
}

exports.addTocart = async(req,res,next) =>{
  try {
    const cart = await Product.findByPk(req.params.id)
    res.status(200).json({cart})
  } catch (err) {
    next(err)
  }
}