const express = require("express");
const { uploadImageLink, uploadImage, addRental, getUserPlace, getSinglePlace, updatePlace, getAllPlaces } = require("../controllers/place")
const placeRouter = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");

const photosMiddleware = multer({ dest: "uploads/" });


placeRouter.post("/upload-by-link", uploadImageLink )
placeRouter.post("/upload", photosMiddleware.array("photos", 100), uploadImage);
placeRouter.post("/places", verifyToken, addRental )
placeRouter.get("/user-places", verifyToken, getUserPlace)
placeRouter.get("/places/:id", getSinglePlace);
placeRouter.put("/places", verifyToken , updatePlace);
placeRouter.get("/places", verifyToken, getAllPlaces);




module.exports = placeRouter;