/* eslint-disable */

import { useLocation, useNavigate } from "react-router-dom";

export default function ArchiveDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const archive = location.state?.archive;

  if (!archive) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-900 text-white text-2xl'>
        No archive data available.
      </div>
    );
  }

  const videoUrl = URL.createObjectURL(
    new Blob([archive.videoBlob], { type: archive.videoType })
  );

  const date = new Date(archive.timestamp);
  const formattedDate = date.toLocaleString();

  const resultColor =
    archive.result === "truth"
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white";

  return (
    <>
      <div className='details bg body flex justify-center items-start w-full min-h-screen md:pt-24 pt-20 px-4'>
        <div className='max-w-[500px] w-full flex flex-col items-center md:p-6  p-3 border border-[#99BBFE] rounded-lg shadow-lg'>
          {/* Video Frame ثابت */}
          <div className='md:w-[380px] w-[300px] h-[220px] overflow-hidden flex items-center justify-center bg-black rounded-lg border border-[#99BBFE] mb-6'>
            {videoUrl ? (
              <video
                className='w-full h-full object-cover'
                controls
                src={videoUrl}
              />
            ) : (
              <p className='text-white text-center'>No Video Available</p>
            )}
          </div>

          {/* Info Box */}
          <div className='content border border-[#99BBFE]  rounded-lg md:mt-3 mt-1 p-6 flex flex-col gap-6 md:w-[380px] w-[300px]'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                Name:
              </span>
              <span className='text-white text-lg sm:text-xl font-semibold'>
                {archive.name}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                Date:
              </span>
              <span className='text-white text-lg sm:text-xl font-semibold'>
                {formattedDate}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                ID:
              </span>
              <span className='text-white text-lg sm:text-xl font-semibold'>
                {archive.id}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-gray-300 text-lg sm:text-xl font-semibold'>
                Result:
              </span>
              <span
                className={`text-lg sm:text-xl font-bold px-6 py-2 rounded-lg ${archive.result === "Truth"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
                  }`}>
                {archive.result}
              </span>
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/archives")}
            className='mt-6 px-8 py-3 bg-[#0c9ddcf4] hover:bg-blue-700 rounded-[20px] text-white text-lg font-semibold md:w-[380px] w-[300px] transition duration-200'>
            Back to Archives
          </button>
        </div>
      </div>
    </>
  );
}
