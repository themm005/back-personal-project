require('dotenv').config();
const express = require('express')
const cors = require('cors');
// const {sequelize} = require('./models')
const employeeController = require('./controller/employeecontroller')
const productRoute = require('./route/productRoute')
const orderRoute = require('./route/orderRoute')




const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/register',employeeController.register);
app.post('/login',employeeController.login)
app.use('/product', productRoute)
app.use("/order", orderRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'path not found on this server' });
});
// sequelize.sync({ force: true }).then(() => console.log('DB Sync'));


const port = process.env.PORT
app.listen(port, () => console.log(`server running on port ${port}`));