const { Order, OrderItem, Employee, Product } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const {orderItems} = req.body
    const order = await Order.create({ employeeId: req.user.id });

    const arr = orderItems.map(product => {return {...product, orderId: order.id}})
    await OrderItem.bulkCreate(arr)
    
    console.log(arr);
    res.status(200).json({a});
  } catch (err) {
    next(err);
  }
};

exports.getAllOrder = async (req,res,next) =>
{
  try {
    const order = await Order.findAll({
      include: [
        {
          model: Employee,
          attributes: ["firstName"]
        }
      ],
    });
     res.status(200).json({ order });
  } catch (error) {
    next(error)
  }
}

exports.getOrderIncludeOrderItem = async(req, res, next) => {
  try {
    const {id} = req.params
    const orderItem = await Order.findAll({
      where:{id:id},
        include: [
          {
            model: OrderItem,
            include: {
              model: Product,
              attributes: ["productName", "price", "imgfile"],
            },
            attributes: ["quantity"],
          },
        ],
      },
    );
    console.log(id)
    res.status(200).json({ orderItem });
  } catch (error) {
    next(error)
  }
}

exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    await Order.destroy({ where: { id } })
    res.status(204).json({message:"delete succces"})
  } catch (err) {
    next(err)
  }
}

