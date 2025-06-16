import { useState, useRef, useContext, useEffect } from "react";
import photo from "../../assets/photo.jpg";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import style from './Profile.module.css'


export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const [data, setData] = useState({});
  const { userId, setUserId } = useContext(UserContext);



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;

        const ctx = canvas.getContext("2d");
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        canvas.toBlob(
          (blob) => {
            const processedFile = new File([blob], file.name, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(processedFile);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  async function getData(userId) {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://apipermisson.runasp.net/api/User/GetUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("User data fetched:", response.data);


      setData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data)); // Store in localStorage
      setIsDisabled(true);
      setLoading(false);
    } catch (error) {
      alert("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Retrieve stored userId
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("Fetching user data for:", storedUserId);
      getData(storedUserId);
    } else {
      console.warn("User ID is not available!");
    }
  }, [setUserId]);



  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const { setUserData } = useContext(UserContext); // Add this
  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedData = {
      userId,
      userName: data.userName,
    };

    try {

      await axios.put(
        `https://apipermisson.runasp.net/api/User/UpdateUser`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Keep token as string
          },
        }
      );

      // Preserve existing data and update only the necessary fields
      const updatedData2 = {
        ...data, // Keeps email & phone number
        userName: updatedData.userName,
      };
      console.log(localStorage.getItem("userToken"));
      setData(updatedData2);
      setUserData(localStorage.getItem("userToken")); // Ensure userData remains a string (token)
      localStorage.setItem("userData", JSON.stringify(updatedData2)); // Store updated user data

      alert("Profile updated successfully!");
      setIsDisabled(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return loading ? (
    <div className="flex justify-center   items-center h-screen bg">
      <span className={`${style.loader} `}></span>{" "} 
    </div>
  ) : (
    <div
      className='profile bg h-screen flex flex-col justify-center items-center px-5 sm:px-0'
      id='Profile'>
      <div
        className='container glass-container rounded-lg shadow-lg lg:max-w-screen-lg md:max-w-screen-md xsm:max-w-screen-sm mx-auto p-6 lg:p-8 xsm:grid sm:grid-cols-2 md:gap-6 xsm:grid-col-1'
        style={{ boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)" }}>
        <div className='form md:w-full sm:w-3/4 xsm:w-full sm:order-1 xsm:order-2'>
          <form onSubmit={handleUpdate}>
            <div
              className={`relative flex py-5 z-0 w-full group ${isDisabled ? "space-x-2 flex-row-reverse" : ""
                }`}>
              <input
                type='text'
                name='name'
                id='name'
                disabled={isDisabled}
                value={data.userName || ""}
                onChange={(e) => setData({ ...data, userName: e.target.value })}
                aria-label='Name input field'
                className={`block w-full px-0 text-lg text-gray-300 bg-transparent ${isDisabled
                  ? "border-none px-7 py-0 mt "
                  : "border-b-2 border-gray-300 focus:border-gray-500 border-0"
                  }`}
                placeholder=' '
              />
              <label
                htmlFor='name'
                className={`peer-focus:font-medium font-Abril text-lg text-gray-300 dark:text-white duration-300 ${isDisabled
                  ? "flex text-2xl"
                  : "absolute transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                  }`}>
                Name:
              </label>
            </div>

            <div
              className={`relative flex py-5 z-0 w-full group ${isDisabled ? "space-x-2 flex-row-reverse" : ""
                }`}>
              <input
                type='email'
                name='email'
                id='email'
                disabled={isDisabled}
                value={data.email || ""}
                className={`block w-full px-0 text-lg text-gray-300 bg-transparent ${isDisabled
                  ? "border-none px-7 py-0 mt"
                  : "border-b-2 border-gray-300 focus:border-gray-300 border-0"
                  }`}
                placeholder=' '
              />
              <label
                htmlFor='email'
                className={`peer-focus:font-medium font-Abril text-lg text-gray-300 dark:text-white duration-300 ${isDisabled
                  ? "flex text-2xl"
                  : "absolute transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                  }`}>
                Email:
              </label>
            </div>

            <div
              className={`relative flex py-5 z-0 w-full group ${isDisabled ? "space-x-2 flex-row-reverse" : ""
                }`}>
              <input
                type='tel'
                name='phone'
                id='phone'
                disabled={isDisabled}
                value={data.phoneNumber || ""}
                className={`block w-full px-0 text-lg text-gray-300 bg-transparent ${isDisabled
                  ? "border-none px-7 py-0 mt"
                  : "border-b-2 border-gray-300 focus:border-gray-300 border-0 "
                  }`}
                placeholder=' '
              />
              <label
                htmlFor='phone'
                className={`peer-focus:font-medium font-Abril text-lg text-gray-300 dark:text-white duration-300 ${isDisabled
                  ? "flex text-2xl"
                  : "absolute transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
                  }`}>
                Phone:
              </label>
            </div>

            <div className='country py-5 text-center'>
              <select
                value={data.country || ""}
                className='block w-3/4 px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:text-[#191E3F] font-lato font-medium'
                disabled={isDisabled}>
                <option>Choose a country</option>
                <option value='US'>United States</option>
                <option value='CA'>Canada</option>
                <option value='FR'>France</option>
                <option value='DE'>Germany</option>
              </select>
            </div>

            <div className='btn-profile py-5'>
              <button
                type='button'
                className='mt-5 py-2 px-8 bg-[#99BBFE] text-white rounded-lg hover:bg-[#86adfa] text-lg'
                onClick={
                  isDisabled ? () => setIsDisabled(false) : handleUpdate
                }>
                {isDisabled ? "Edit" : "Save"}
              </button>
            </div>
          </form>
        </div>

        <div className='image flex flex-col justify-start items-center text-center pt-5 lg:mt-0 xsm:order-1 sm:order-2'>
          <div
            onClick={handleClick}
            className='cursor-pointer bg-white rounded-lg'>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt='Uploaded'
                className='rounded-lg md:w-40 md:h-40 bg-white xsm:w-36 xsm:h-36 focus:ring-blue-300 dark:focus:ring-blue-800'
              />
            ) : (
              <img
                src={photo}
                alt='Default Logo'
                className='rounded-lg md:w-40 md:h-40 xsm:w-36 xsm:h-36 shadow-lg'
              />
            )}
            <input
              type='file'
              accept='image/*'
              ref={hiddenFileInput}
              className='hidden'
              onChange={handleImageChange}
            />
          </div>
          <div className='btn py-7'>
            <button className='bg-white text-[#191E3F] md:px-10 xsm:px-8 py-2 rounded-lg font-lato font-medium'>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};


