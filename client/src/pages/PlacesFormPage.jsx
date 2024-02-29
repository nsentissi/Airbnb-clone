import React, { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/rentals/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setaddedPhotos(data.addedPhotos);
      setPerks(data.perks);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price)
    });
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    if (id) {
      await axios.put("/api/rentals/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post("/api/rentals/places", placeData);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className="text-2xl mt-4">Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="title"
        />
        <h2 className="text-2xl mt-4">Address</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="address"
        />
        <h2 className="text-2xl mt-4">Photos</h2>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setaddedPhotos} />
        <h2 className="text-2xl mt-4">Description</h2>
        <textarea
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Description of the place"
        />
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm">
          Select all the features that your property offers
        </p>
        <div className="grid gap-2 mt-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        <h2 className="text-2xl mt-4">Extra Info</h2>
        <p className="text-gray-500 text-sm">House rules, etc ..</p>
        <textarea
          value={extraInfo}
          onChange={(e) => {
            setExtraInfo(e.target.value);
          }}
        ></textarea>
        <h2 className="text-2xl mt-4">Check-in & Check-out times</h2>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
              placeholder="10:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max Number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => {
                setMaxGuests(e.target.value);
              }}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price pet night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4 max-w-32">Save</button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
