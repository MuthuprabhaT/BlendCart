const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./config/dbConfig");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

dotenv.config();

dbConnection();

app.use(
  cors({
    origin: process.env.BASE_URL, // Frontend URL
    credentials: true, // Allow cookies to be sent and received
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running test...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});

// if (process.env.NODE_ENV === "production") {
//   // const __dirname = path.resolve();
//   app.use("/uploads", express.static("/var/data/uploads"));
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   // const __dirname = path.resolve();
//   app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Server is running on ${port} port`);
// });
