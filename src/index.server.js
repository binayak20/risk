const express = require('express');
const env = require('dotenv');
const app = express();
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

//environment variable or you can say constants
env.config();

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.tfah9.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}
	)
	.then(() => {
		console.log('Database connected');
	});
//mongodb+srv://risk:<password>@cluster0.tfah9.mongodb.net/<dbname>?retryWrites=true&w=majority
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
