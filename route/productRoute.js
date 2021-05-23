const { Product } = require('../models');
const express = require('express')
const employeeController =require('../controller/employeecontroller')
const productcontroller = require('../controller/productcontroller')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs')


cloudinary.config({ 
  cloud_name: 'dvgvqcxyh', 
  api_key: '192834187695667', 
  api_secret: 'Y_oEYfyVTV29yUjdIlr1lhdsKV8' 
});

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    console.log(file)
    cb(null, 'public/images')
  },
  filename:(req,file,cb)=>{
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
  }
})
const uplaod = multer({storage: storage, fileFilter:(req,file,cb)=>{
  if(file.mimetype.split('/')[1] === 'jpeg' || 
   file.mimetype.split('/')[1] === 'png' || 
   file.mimetype.split('/')[1] === 'jpg' ) 
   {
    cb(null,true)
   } else {
    cb(new Error('this file not a photo'))
   }
}})

const router = express.Router();

router.get("/", employeeController.protect, productcontroller.getAllProduct);
router.post('/',employeeController.protect,uplaod.single('imgfile'),async(req,res,next)=>{
  cloudinary.uploader.upload(req.file.path, async(err,result)=>{
  const { productName,price,desc,amount,type} = req.body
  const product = await Product.create({
    productName,
    price,
    desc,
    amount,
    type,
    imgfile:result.secure_url,
    employeeId: req.user.id
  })
  fs.unlinkSync(req.file.path)
  res.status(200).json({product})
})
})

router.patch(
  "/:id",employeeController.protect,
  productcontroller.updateProduct
);



module.exports = router