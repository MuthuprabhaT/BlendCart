const Product = require("../models/productModel");
const asyncHandler = require("../middleware/asyncHandler");
const cloudinary = require("../utils/cloudinary").v2;
const upload = require("../utils/multer");

// @desc    Fetch all Products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a Product
// @route   GET/api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// const createProduct =
//   (upload.single("image"),
//   asyncHandler(async (req, res) => {
//     const imageResult = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "auto",
//       folder: "shopping_cart",
//     });

//     console.log("image", imageResult);

//     const product = new Product({
//       name: "Sample name",
//       price: 0,
//       user: req.user._id,
//       image: imageResult.secure_url,
//       brand: "Sample brand",
//       category: "Sample category",
//       countInStock: 0,
//       numReviews: 0,
//       description: "Sample description",
//     });

//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   }));

// const createProduct = [
//   upload.single("image"), // Multer will now store the file in memory
//   asyncHandler(async (req, res) => {
//     try {
//       // Ensure req.file exists before trying to upload to Cloudinary
//       if (!req.file) {
//         return res.status(400).json({ message: "Image file is required" });
//       }

//       // Upload to Cloudinary directly from the buffer
//       const imageResult = await cloudinary.uploader.upload_stream(
//         {
//           resource_type: "auto", // Automatically determine the file type
//           folder: "shopping_cart", // Folder in Cloudinary
//         },
//         (error, result) => {
//           if (error) {
//             return res
//               .status(500)
//               .json({ message: "Image upload failed", error: error.message });
//           }

//           // Create product with the Cloudinary image URL
//           const product = new Product({
//             name: req.body.name || "Sample name",
//             price: req.body.price || 0,
//             user: req.user._id,
//             image: imageResult.secure_url, // Use the secure URL from Cloudinary
//             brand: req.body.brand || "Sample brand",
//             category: req.body.category || "Sample category",
//             countInStock: req.body.countInStock || 0,
//             numReviews: 0,
//             description: req.body.description || "Sample description",
//           });

//           // Save the product to the database
//           product.save().then((createdProduct) => {
//             res.status(201).json(createdProduct);
//           });
//         }
//       );

//       // Create a readable stream from the buffer
//       const bufferStream = new Readable();
//       bufferStream.push(req.file.buffer);
//       bufferStream.push(null);
//       bufferStream.pipe(imageResult);
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//       res
//         .status(500)
//         .json({ message: "Image upload failed", error: error.message });
//     }
//   }),
// ];

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
