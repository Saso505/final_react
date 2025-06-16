/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { addArchive, getAllArchives } from "../../utility/db";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import style from "./Service.module.css";

function Service() {
  const [videoFile, setVideoFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);

  const hiddenFileInput = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const videoPreviewRef = useRef(null);
  const ffmpegRef = useRef(createFFmpeg({ log: true }));

  useEffect(() => {
    async function fetchArchives() {
      const data = await getAllArchives();
      const lastId = Math.max(...data.map((a) => Number(a.id) || 0), 0);
      setNextId(lastId + 1);
    }
    fetchArchives();

    return () => {
      if (ffmpegRef.current.isLoaded()) {
        ffmpegRef.current.exit();
      }
    };
  }, []);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setIsFormVisible(true);
  };

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const handleRecordToggle = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.play();
        }

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) =>
          event.data.size > 0 && recordedChunks.current.push(event.data);

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: "video/webm" });
          setVideoBlob(blob);
          recordedChunks.current = [];
          stream.getTracks().forEach((track) => track.stop());
          setIsFormVisible(true);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Unable to access your camera. Please grant permissions.");
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    setVideoBlob(null);
    setVideoFile(null);
    setIsFormVisible(false);
  };

  const handleCloseButton = (closeToast) => {
    closeToast(); // Properly close the toast when the button is clicked
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.username.value;
    const id = nextId;

    if (!videoBlob && !videoFile) {
      toast.error("No video available. Please upload or record a video.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    let videoToSend;
    let videoFilename;

    const ffmpeg = ffmpegRef.current;

    if (videoBlob) {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      ffmpeg.FS("writeFile", "input.webm", await fetchFile(videoBlob));

      try {
        await ffmpeg.run(
          "-i",
          "input.webm",
          "-c:v",
          "libx264",
          "-preset",
          "fast",
          "-c:a",
          "aac",
          "output.mp4"
        );
        const data = ffmpeg.FS("readFile", "output.mp4");
        videoToSend = new Blob([data.buffer], { type: "video/mp4" });
        videoFilename = "recording.mp4";
      } catch (error) {
        console.error("FFmpeg conversion error:", error);
        toast.error("Failed to convert video!", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      } finally {
        ffmpeg.FS("unlink", "input.webm");
        ffmpeg.FS("unlink", "output.mp4");
      }
    } else if (videoFile) {
      videoToSend = videoFile;
      videoFilename = videoFile.name;
    }

    const formData = new FormData();
    formData.append("video", videoToSend, videoFilename);

    try {
      const response = await axios.post(
        "https://deception-api-production-cfcd.up.railway.app/predict",
        formData
      );
      const result = response.data.result;

      toast(
        ({ closeToast }) => (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-[9999]">
            <div
              className="relative flex flex-col gap-4 p-4 w-[400px] h-[200px] rounded-xl shadow-[inset_0_-16px_24px_0_rgba(255,255,255,0.25)] 
              bg-[#262463] 
              bg-[radial-gradient(at_85%_30%,hsla(0,0%,50%,0.1)_0px,transparent_0px), 
                   radial-gradient(at_49%_50%,hsla(0,0%,50%,0.5)_0px,transparent_85%), 
                   radial-gradient(at_14%_26%,hsla(0,15%,5%,0.35)_0px,transparent_85%), 
                   radial-gradient(at_0%_64%,hsla(250,90%,50%,1)_0px,transparent_85%), 
                   radial-gradient(at_41%_94%,hsla(284,100%,84%,1)_0px,transparent_85%), 
                   radial-gradient(at_100%_95%,hsla(250,100%,50%,1)_0px,transparent_85%)]"
            >
              <div
                className="absolute -z-10 top-1/2 left-1/2 w-[calc(100%+2px)] h-[calc(100%+2px)] rounded-xl overflow-hidden pointer-events-none transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-gray-600 to-white"
              />
              <div className="card_title__container text-center flex justify-center items-center flex-col h-full">
                <div className="text-white text-xl font-semibold">
                  Result: <span className="text-xl">{result}</span>
                </div>
                <div className="btn w-3/4 py-5">
                  <button
                    className="cursor-pointer w-full py-2 text-white text-sm rounded-full border-0 
                    bg-gradient-to-t from-[#5e3bee] to-[#262463] shadow-[inset_0_-2px_25px_-4px_white]"
                    onClick={() => handleCloseButton(closeToast)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          position: "center",
          autoClose: 500, // Auto-close after 0.5 seconds (optional, remove if manual close is preferred)
          closeOnClick: false,
          closeButton: false,
        }
      );

      const newEntry = {
        name,
        id,
        result,
        videoBlob: await videoToSend.arrayBuffer(),
        videoType: videoToSend.type,
        timestamp: Date.now(),
      };

      await addArchive(newEntry);

      toast.success("Video saved in archive!", {
        position: "top-center",
        autoClose: 3000,
      });

      setVideoBlob(null);
      setVideoFile(null);
      setIsFormVisible(false);
      setNextId(id + 1);
      setShowThankYou(true);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="service py-10" id="Service">
      <div className="flex justify-center items-center py-10">
        <h1 className="text-5xl font-bold text-white">Service</h1>
      </div>

      <div className="flex flex-col items-center justify-center p-5">
        <div className="flex gap-8 py-6">
          <button
            onClick={handleUploadClick}
            className={`${style.submitGlassB} text-white text-md md:text-lg font-inter font-medium cursor-pointer shadow-whiteShadow md:px-6 px-3 md:py-2 py-1 rounded-lg `}
          >
            Upload Video
          </button>
          <button
            onClick={handleRecordToggle}
            className={`py-2 px-3 md:px-6 md:text-lg font-bold text-md ${isRecording
              ? `${style.stopGlassB} font-inter font-medium rounded-lg py-1 cursor-pointer shadow-whiteShadow`
              : `${style.startGlassB} font-inter font-medium rounded-lg px-3 py-1 cursor-pointer shadow-whiteShadow`
              } text-white rounded-lg`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>

        <input
          type="file"
          accept="video/*"
          ref={hiddenFileInput}
          onChange={handleVideoChange}
          className="hidden"
        />

        <div className="record mt-5 flex flex-col items-center gap-6">
          {(videoBlob || videoFile) && (
            <div className="flex flex-col items-center">
              <video
                controls
                className="w-72 overflow-hidden shadow-custom border border-slate-400/50 rounded-lg"
                src={
                  videoBlob
                    ? URL.createObjectURL(videoBlob)
                    : URL.createObjectURL(videoFile)
                }
              />
              <button
                onClick={deleteRecording}
                className="md:mt-5 mt-1 cursor-pointer text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-sm px-4 py-3 text-center"
              >
                <i className="fa-solid fa-trash text-lg"></i>
              </button>
            </div>
          )}

          {!videoBlob && !videoFile && (
            <div>
              <video ref={videoPreviewRef} className="w-96 rounded-lg" muted />
            </div>
          )}

          {isFormVisible && (
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col md:gap-6 gap-2 bg-gray-800/40 md:p-6 p-2 rounded-lg md:w-96 w-72 md:mt-5 mt-2"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="text-white font-inter text-lg"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="id" className="text-white font-inter text-lg">
                  ID
                </label>
                <input
                  type="number"
                  name="id"
                  id="id"
                  value={nextId}
                  readOnly
                  className="px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className={`${style.submitGlassB} text-white px-6 py-2 rounded-lg mt-2`}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>

      <ToastContainer
        position="center"
        autoClose={500}
        closeOnClick={false}
        closeButton={false}
      />
    </div>
  );
}

export default Service;