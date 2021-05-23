const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Empolyee = sequelize.define(
    'Employee',
    {
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password:{
      type:DataTypes.STRING,
      allowNull:false
      },
      firstName:{
      type:DataTypes.STRING,
      allowNull:false
      },
      lastName:{
      type:DataTypes.STRING,
      allowNull:false
      },
      phoneNumber:{
      type:DataTypes.STRING,
      allowNull:false
      },
      role:{
        type: DataTypes.ENUM,
        values: ['EMPLOYEE', 'SHOPOWNER'],
      },
    },
    {
      underscored: true
    }

  )
  Empolyee.associat = (models) =>{
    Empolyee.hasMany(models.Order,{
      foreignKey: {
        name: "orderId",
        allowNull: false,
        field: "order_id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    })
  Employee.associat = (models) =>{
    Empolyee.hasMany(models.Product,{
      foreignKey: {
        name: "employeeId",
        allowNull: false,
        field: "employee_id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    })
  } 
  }
  return Empolyee
}