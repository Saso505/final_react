/* eslint-disable */

import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";

import toast from "react-hot-toast";

export default function Login() {
  let Navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  let { setUserData, setUserId } = useContext(UserContext);

  //validation
  let validation = yup.object().shape({
    Email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),

    Password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
        " must be at least 6 characters, include one uppercase letter and one special character "
      )
      .required("Password is required"),
  });

  async function handleLogin(formValue) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://apipermisson.runasp.net/api/Auth/login`,
        formValue
      );
      console.log(data);

      if (data.isAuthenticated) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.id);

        toast.success(data.message); // Show success message before navigating

        formik.resetForm();

        setTimeout(() => {
          Navigate('/')
        }, 1000);

        setUserData(data.token);
        setUserId(data.id);
      }
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: { Email: "", Password: "" },
    validationSchema: validation,
    onSubmit: handleLogin,
  });

  return (
    <>

      <div className='login  bg  body items-center w-full justify-center flex h-screen '>
        <div className='container  items-center  justify-center flex '>
          <div className='row'>
            <form onSubmit={formik.handleSubmit}>
              <div className='glass-container sm:w-[34.785rem] sm:h-[34.758rem] xsm:w-[350px] xsm:h-[500px] '>
                <h1
                  className={`${style.highlight} sm:text-[3rem] xsm:text-3xl  py-4 `}>
                  Eye of Veritas
                </h1>

                <div className='relative sm:mt-1 z-0 w-3/4 py-5 group'>
                  <input
                    type='email'
                    name='Email'
                    id='Email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Email}
                    className='block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300   peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='Email'
                    className='peer-focus:font-medium absolute  font-lato text-lg text-gray-500 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                    Email{" "}
                  </label>
                  {formik.errors.Email && formik.touched.Email ? (
                    <span className='font-medium  text-red-500  absolute text-xs '>
                      {formik.errors.Email}
                    </span>
                  ) : null}
                </div>
                <div className='relative sm:mt-1 z-0 w-3/4 py-5   group'>
                  <input
                    type='password'
                    name='Password'
                    id='Password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Password}
                    className='block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='Password'
                    className='peer-focus:font-medium absolute text-lg text-gray-500  font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                    Password
                  </label>
                  {formik.errors.Password && formik.touched.Password ? (
                    <span className='font-medium  text-red-500  absolute text-xs '>
                      {formik.errors.Password}
                    </span>
                  ) : null}
                </div>

                <div className='btn-login w-full flex  items-center  justify-center xsm:py-1 sm:py-5 '>
                  {Loading ? (
                    <button
                      type='button'
                      className='text-white w-1/2 bg-gradient-to-r bg-[#191E3F] hover:bg-gradient-to-br   focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px]  py-1 text-center '>
                      {" "}
                      <span className={`${style.loader} `}></span>{" "}
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='text-white w-2/3 bg-gradient-to-r bg-[#191E3F] hover:bg-gradient-to-br   font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl  py-2 text-center me-2 mb-2'>
                      {" "}
                      Login{" "}
                    </button>
                  )}
                </div>

                <div className='btn-login w-full flex  items-center  justify-center xsm:py-3 sm:py-5 '>
                  <button
                    type='button'
                    className='text-[#191E3F] bg-white xsm:text-xs xsm:px-4  focus:ring-2 focus:outline-none focus:ring-[#191E3F]/50 font-medium rounded-[55px] sm:text-lg py-2.5  flex text-center justify-center items-center dark:focus:ring-[#4285F4]/55   sm:w-1/2 '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6 sm:me-5 xsm:me-1'
                      viewBox='0 0 48 48'>
                      {" "}
                      <path
                        fill='#EA4335'
                        d='M24 9.5c3.15 0 5.93 1.22 8.07 3.21l6.04-6.04C34.15 3.15 29.31 1 24 1 14.65 1 6.84 6.63 3.27 14.24l7.1 5.49C12.22 14.47 17.69 9.5 24 9.5z'
                      />{" "}
                      <path
                        fill='#4285F4'
                        d='M46.27 24.5c0-1.67-.15-3.27-.43-4.81H24v9.11h12.69c-.55 2.93-2.21 5.41-4.72 7.11l7.31 5.66C43.72 37.67 46.27 31.49 46.27 24.5z'
                      />
                      <path
                        fill='#FBBC04'
                        d='M9.37 28.38A14.5 14.5 0 0 1 9.5 24c0-1.49.24-2.92.66-4.28l-7.1-5.49A23.99 23.99 0 0 0 1 24c0 3.94.94 7.66 2.61 10.95l7.08-5.47z'
                      />
                      <path
                        fill='#34A853'
                        d='M24 46c5.94 0 10.95-2 14.62-5.42l-7.31-5.66c-2.05 1.37-4.69 2.15-7.31 2.15-6.31 0-11.78-4.97-13.13-11.5l-7.09 5.47C6.84 41.37 14.65 46 24 46z'
                      />
                      <path fill='none' d='M0 0h48v48H0z' />
                    </svg>
                    Sign in with Google
                  </button>
                </div>
                <div className='realtive'>
                  <p className='text-white text-sm  absolute sm:left-80 top-[82%] xsm:py-4 xsm:left-32'>
                    Don't have an account?{" "}
                    <Link
                      to='/register'
                      className={`font-bold ${style.signup} me-2`}>
                      Sign Up
                    </Link>
                  </p>
                  <div className='underline relative '>
                    <div className='line w-14 bg-white h-[0.125rem] absolute  sm:top-[3.3rem] sm:left-[11.8rem] xsm:top-16 xsm:left-24 '></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
