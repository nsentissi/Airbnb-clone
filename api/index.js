require("dotenv").config();
require("./db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const download = require("image-downloader");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const userRouter = require("./routes/user")


const app = express();



app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", userRouter)




app.post("/upload-by-link", async (req, res) => {
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
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
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
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
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
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: user.id,
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
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const { id } = user;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
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

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
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
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req)
  const { place, checkIn, checkOut, numberOfGuests, name, mobile, price } =
    req.body;
  const bookingDoc = await Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    mobile,
    price,
    user: userData.id
  });
  res.json(bookingDoc);
});



app.get("/bookings", async (req, res) => {
 const userData = await getUserDataFromReq(req);
 res.json( await Booking.find({user: userData.id}).populate('place'))
});

app.listen(3000);
