/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllArchives } from "../../utility/db";

export default function Archives() {
  const navigate = useNavigate();
  const [archives, setArchives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchArchives() {
      const data = await getAllArchives();
      // Limit to 5 items for this page
      setArchives(data.slice(0, 3));
    }
    fetchArchives();
  }, []);

  const filteredArchives = archives.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArchiveClick = (archive) => {
    navigate("/archived", { state: { archive } });
  };

  return (
    <div className="archives bg py-20 px-4 sm:px-8 md:px-48 min-h-screen">
      <div className="container mx-auto">
        <div className="head">
          <h1 className="font-Abril text-slate-100 md:text-5xl text-2xl py-10 text-center relative">
            Archives
          </h1>
        </div>

        {/* Search */}
        <div className="header flex items-center justify-start py-5 ">
          <div className="search-name w-full sm:w-1/3 ">
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <div className="flex w-full ">
                <div className="relative w-full">
                  <input
                    type="search"
                    id="location-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search by name"
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium bg-[#262463] text-white  rounded-e-lg border border-blue-300 ">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Archives List */}
        {filteredArchives.length === 0 ? (
          <p className="text-center text-gray-300 text-xl mt-10">
            No videos found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 mt-10">
            {filteredArchives.map((entry) => {
              const videoUrl = URL.createObjectURL(
                new Blob([entry.videoBlob], { type: entry.videoType })
              );
              const date = new Date(entry.timestamp);
              const formattedDate = date.toLocaleString();

              return (
                <div
                  key={entry.timestamp}
                  className="content flex items-center justify-between py-5 rounded-lg shadow-lg border-b border-[#99BBFE]/30"
                >
                  <div
                    className="card flex items-center gap-4 cursor-pointer"
                    onClick={() => handleArchiveClick(entry)}
                  >
                    <div className="video w-24 h-24 sm:w-32 sm:h-32">
                      <video
                        className="w-full h-full object-cover rounded-lg"
                        src={videoUrl}
                        muted
                      />
                    </div>
                    <div className="card-body text-white">
                      <h3 className="text-sm  md:font-semibold font-normal">
                        Name: {entry.name}
                      </h3>
                      <p className="text-xs sm:text-sm md:font-semibold font-normal">ID: {entry.id}</p>
                      <p className="text-xs sm:text-sm md:font-semibold font-normal">
                        Result: {entry.result}
                      </p>
                      <p className="text-xs sm:text-sm md:font-semibold font-normal">
                        Date: {formattedDate}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleArchiveClick(entry)}
                    className="bg-[#99BBFE] font-Abril font-medium rounded-lg text-white md:px-5 px-2 md:py-2 py-1 cursor-pointer text-sm  md:text-lg capitalize shadow-whiteShadow"
                  >
                    Info Video
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}