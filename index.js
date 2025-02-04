const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
//import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
//app
const app = express();
// db
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected"));
//middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
//routes middleware
app.get("/", (req, res) => {
	res.json({ sucess: true });
});
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on: http://localhost:${port}`);
});
