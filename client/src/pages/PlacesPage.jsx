import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../Perks";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuests] = useState(1);

  const  addPhotoByLink = async (e) => {
    e.preventDefault();
   const {data:filename} = await axios.post ('/upload-by-link', {link: photoLink })
    setaddedPhotos(prev => {
        return [...prev, filename]
    })
    setPhotoLink('')
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
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
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => {
                  setPhotoLink(e.target.value);
                }}
                placeholder="add photo using a link"
              />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl py-2 ">
                Add photo
              </button>
            </div>
            <div className="mt-2 gap-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link =>(
                    <img className="h-36 rounded-2xl" src={'http://localhost:3000/uploads/'+link}  />
                )) }
              <button className=" flex items-center justify-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload from your device
              </button>
            </div>
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
            <div className="grid gap-2 sm:grid-cols-3">
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
                  value={maxGuest}
                  onChange={(e) => {
                    setMaxGuests(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4 max-w-32">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
