const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Product = sequelize.define(
    'Product',
    {
      productName:{
      type:DataTypes.STRING,
      allowNull:false
      },
      price:{
        type:DataTypes.DECIMAL(10, 2),
      allowNull:false
      },
      desc:{
        type:DataTypes.STRING,
      },
      amount:{
        type:DataTypes.INTEGER,
      allowNull:false
      },
      imgfile :{
        type:DataTypes.STRING
      },
      type:{
        type: DataTypes.ENUM,
        values: ['DOG', 'CAT', 'FISH'],
        allowNull: false
      },
      
    },
    {
      underscored: true
    }
  )
    Product.associate = (models) => {
      Product.hasMany(models.OrderItem, {
        foreignKey: {
          name: "productId",
          allowNull: false,
          field: "product_id",
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
      Product.belongsTo(models.Employee, {
        foreignKey: {
          name: "employeeId",
          allowNull: false,
          field: "employee_id",
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    }
  return Product
}