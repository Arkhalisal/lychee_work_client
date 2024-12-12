"use client";

import { useEventStore } from "@/app/customHook/useEventStore";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Location() {
  const { locationData, eventData } = useEventStore();
  const locations = Object.entries(locationData);
  const [shownLocations, setShownLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setShownLocations(locations);
  }, [locationData]);

  useEffect(() => {
    const filteredLocations = locations.filter(
      (location) =>
        location[1].venuec.toLowerCase().includes(searchTerm.toLowerCase()) || location[0].includes(searchTerm)
    );
    setShownLocations(filteredLocations);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      <div className="flex flex-col flex-grow max-w-[105rem] mx-auto w-full mt-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Location Page</h1>

        {/* Search input */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search locations or location IDs..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Location table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="py-3 px-4 font-semibold">Location ID</th>
                  <th className="py-3 px-4 font-semibold">Location Name</th>
                  <th className="py-3 px-4 font-semibold">Number of Events</th>
                  <th className="py-3 px-4 font-semibold">Favorite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shownLocations.map((location) => (
                  <tr key={location[0]} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{location[0]}</td>
                    <td className="py-3 px-4">{location[1].venuec}</td>
                    <td className="py-3 px-4">
                      {eventData.filter((event) => Number(event.venueid) === Number(location[0])).length}
                    </td>
                    <td className="py-3 px-4">
                      <FontAwesomeIcon icon={faStar} className="text-gray-300 hover:text-yellow-400 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {shownLocations.length === 0 && <p className="text-center mt-4 text-gray-600">No locations found</p>}
      </div>
    </div>
  );
}
