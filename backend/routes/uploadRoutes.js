const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blend-cart-uploads", // Folder name in Cloudinary
    format: async (req, file) => "webp", // Format of stored image (optional)
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`, // Unique ID
  },
});

// File filter to accept only image files
function fileFilter(req, file, cb) {
  const fileTypes = /jpeg|jpg|png|webp/;
  const mimeTypes = /image\/jpeg|image\/png|image\/webp/;
  const extname = fileTypes.test(file.mimetype);
  const mimetype = mimeTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
}

// Initialize multer with Cloudinary storage
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// Upload route using Cloudinary storage
router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    // Send Cloudinary URL of the uploaded image as the response
    res.status(200).send({
      message: "Image uploaded successfully",
      image: req.file.path, // Cloudinary URL of the image
    });
  });
});

module.exports = router;

// const express = require("express");
// const cloudinary = require("cloudinary").v2;
// const upload = require("../utils/multer");

// const router = express.Router();

// router.post("/", upload.single("image"), async (req, res) => {
//   console.log("Res", res.file);
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "shopping_cart",
//     });

//     res.json({
//       message: "Image uploaded successfully",
//       image: result.secure_url,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error uploading image to cloudinary" });
//   }
// });

// module.exports = router;

// const path = require("path");
// const express = require("express");
// const multer = require("multer");

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, "../../uploads"));
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function fileFilter(req, file, cb) {
//   const fileTypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = mimetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Images only!"), false);
//   }
// }

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, function (err) {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     res.status(200).send({
//       message: "Image uploaded successfully",
//       image: `http://localhost:8000/uploads/${req.file.filename}`,
//     });
//   });
// });

// module.exports = router;
