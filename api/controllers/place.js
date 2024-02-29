const Place = require("../models/Place");
const download = require("image-downloader");
const fs = require("fs");
const path = require("path");



const uploadImageLink = async (req, res) => {
  const { link } = req.body;
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    return res.status(400).json({ error: "Invalid URL provided" });
  }

  const newName = "photo" + Date.now() + ".jpg";
  try {
    await download.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
};

const uploadImage = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path: filePath, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts.pop();
    const newPath = `${filePath}.${ext}`;
    fs.renameSync(filePath, newPath);
    const relativePath = path.relative(__dirname + "/uploads", newPath);
    uploadedFiles.push(relativePath);
  }
  res.json(uploadedFiles);
};

const addRental = async (req, res) => {

  const id = req.user.id
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    const placeDoc = await Place.create({
      owner: id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  } catch (error) {
    console.log(error);
  }
};

const getUserPlace = async (req, res) => {
  const { id } = req.user;
  console.log(req.user)
  try {
    res.json(await Place.find({ owner: id }));
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ message: "Error fetching places" });
  }
};

const getSinglePlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

const updatePlace = async (req, res) => {
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    const placeDoc = await Place.findById(id);
    if (user.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("info updated");
    }
  } catch (error) {
    console.lof(error);
  }
};

const getAllPlaces = async (req, res) => {
  res.json(await Place.find());
}

module.exports = {
  uploadImageLink,
  uploadImage,
  addRental,
  getUserPlace,
  getSinglePlace,
  updatePlace,
  getAllPlaces
};
