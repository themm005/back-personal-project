const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Order = sequelize.define(
    'Order',{},
    {
      underscored: true
    }
  )
  Order.associate = models =>{
    Order.hasMany(models.OrderItem,{
      foreignKey:{
        name: 'orderId',
        allowNull:false,
        field:'order_id'
      },
      onDelete:'RESTRICT',
      onUpdate:'RESTRICT'
    })
    Order.belongsTo(models.Employee,{
      foreignKey:{
        name: 'employeeId',
        field:'employee_id'
      },
      onDelete:'RESTRICT',
      onUpdate:'RESTRICT'
    })
  }  
  return Order
}