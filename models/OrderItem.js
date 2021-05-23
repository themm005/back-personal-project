const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      quantity:{
        type:DataTypes.INTEGER,
      allowNull:false
    },
      price:{
      type:DataTypes.DECIMAL(10, 2),
      allowNull:false
    }
    
    }
  )
  OrderItem.associate = models =>{
    OrderItem.belongsTo(models.Product,{
      foreignKey:{
        name: 'productId',
        allowNull:false,
        field:'product_id'
      },
      onDelete:'RESTRICT',
      onUpdate:'RESTRICT'
    })
    OrderItem.belongsTo(models.Order,{
      foreignKey:{
        name: 'orderId',
        allowNull:false,
        field:'order_id'
      },
      onDelete:'RESTRICT',
      onUpdate:'RESTRICT'
    })
  };
  return OrderItem
}