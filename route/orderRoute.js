const express = require("express");
const employeeController = require("../controller/employeecontroller");
const orderComtroller = require('../controller/ordercontroller')

const router = express.Router();


router.post("/",
  employeeController.protect,
  orderComtroller.createOrder);

router.get("/", orderComtroller.getAllOrder)  
router.get("/orderbyorderitem/:id", orderComtroller.getOrderIncludeOrderItem)
router.delete("/:id",orderComtroller.deleteOrder)

module.exports = router;