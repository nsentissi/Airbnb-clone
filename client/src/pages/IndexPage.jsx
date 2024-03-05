import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearch } from "../SearchContext";

const IndexPage = () => {
  const [places, setplaces] = useState("");
  const { searchTerm } = useSearch();

  useEffect(() => {
    axios.get("/api/rentals/places").then((response) => {
      setplaces(response.data);
    });
  }, []);

  const filteredPlaces = places && places.filter(place => place.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className=" mt-24 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link to={'/place/'+place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.addedPhotos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square "
                    src={
                      "http://localhost:3000/uploads/" + place.addedPhotos?.[0]
                    }
                  />
                )}
              </div>
              <h3 className="font-bold ">{place.address}</h3>
              <h2 className="text-sm truncate text-gray-500"> {place.title}</h2>

              <div className="mt-2">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default IndexPage;
