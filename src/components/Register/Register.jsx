/* eslint-disable */
"use client";
import React, { useState } from "react";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import logo from "../../assets/logo.jpg";
import * as yup from "yup";
import { Alert } from "flowbite-react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";


 
export default function Register() {
  let Navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  let { setUserData } = useContext(UserContext);

  // Validation schema
  let validation = yup.object().shape({
    userName: yup
      .string()
      .required("Username is required")
      .matches(
        /^[A-Za-z0-9]{3,}$/,
        "Username should contain at least 3 alphanumeric characters"
      ),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^\+20\d{10}$/,
        "Phone number must start with +20 and be 11 digits in total"
      ),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
        "Password must be at least 6 characters, include one uppercase letter and one special character"
      )
      .required("Password is required"),
    ConfirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .transform((value) => value?.trim()),
  });

  // Handle register function
  async function handleRegister(formValues) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://apipermisson.runasp.net/api/Auth/register`,
        formValues
      );
      console.log(data);
      if (data.isAuthenticated) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.id);
        formik.resetForm();
        Navigate("/");
        setUserData(data.token);
      }
    toast.success(data.message);
    
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
      setStatus(err.response.data);
      setLoading(false);
    }
  }

  // Formik setup
  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      ConfirmPassword: "",
    },
    validationSchema: validation,
    onSubmit: handleRegister,
  });

  return (
    <>
   
      <div className='register  bg body items-center w-full justify-center flex h-screen '>
        <div className='container  items-center  justify-center flex  mx-auto'>
          <div className='row xsm:hidden lg:block '>
            <img
              className={`${style.imge}   lg::max-w-[34.758rem]  xl:max-w-[38.758rem] h-[38.758rem] `}
              src={logo}
              alt=''
            />
          </div>
          <div className='row z-1'>
            <form onSubmit={formik.handleSubmit}>
              <div className='glass-container sm:w-[34.758rem]  xl:w-[38.758rem] h-[38.758rem] xsm:w-[350px]    '>
                <h1
                  className={`${style.highlight} sm:text-[3rem] xsm:text-3xl  sm:py-5   h3 xsm:py-0 `}>
                  Create account
                </h1>

                <div className='grid sm:grid-cols-2 w-3/4 sm:gap-8  xsm:gap-0 xsm:w-3/4  '>
                  <div className='relative mt-3 sm:mt-1 z-0 w-full sm:py-5 xsm:py-3 group '>
                    <input
                      type='text'
                      name='userName'
                      id='userName'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userName}
                      className='block sm:py-1 xsm:py-3 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer'
                      placeholder=' '
                    />
                    <label
                      htmlFor='userName'
                      className='peer-focus:font-medium  font-lato absolute text-lg text-gray-300 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                      Username
                    </label>
                    {formik.errors.userName && formik.touched.userName ? (
                      <div className=' text-red-500  text-xs ' role='alert'>
                        <span className='font-medium pt-2 text-red-500  absolute text-xs '>
                          {formik.errors.userName}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className='relative mt-3 sm:mt-1 z-0 w-full sm:py-5 xsm:py-3 group '>
                    <input
                      type='text'
                      name='phoneNumber'
                      id='phoneNumber'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      className='block sm:py-1 xsm:py-3 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer'
                      placeholder=' '
                    />
                    <label
                      htmlFor='userName'
                      className='peer-focus:font-medium  font-lato absolute text-lg text-gray-300 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                      Phone Number
                    </label>
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                      <div className=' text-red-500  text-xs ' role='alert'>
                        <span className='font-medium pt-2 text-red-500  absolute text-xs '>
                          {formik.errors.phoneNumber}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='relative pt-5 sm:mt-1 z-0 w-3/4 sm:py-4 xsm:py-3 group'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className='block px-0 w-full py-2 text-lg text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300   peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='email'
                    className='peer-focus:font-medium absolute  font-lato text-lg text-gray-300 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                    Email{" "}
                  </label>
                  {formik.errors.email && formik.touched.email ? (
                    <span className='font-medium pt-2 text-red-500  absolute text-xs '>
                      {formik.errors.email}
                    </span>
                  ) : null}
                </div>

                <div className='relative mt-3 sm:mt-1 z-0 w-3/4 sm:py-3 xsm:py-4  group'>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className='block py-2 px-0 w-full text-lg  text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='password'
                    className='peer-focus:font-medium absolute text-lg text-gray-300  font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                    Password
                  </label>
                  {formik.errors.password && formik.touched.password ? (
                    <span className='font-medium pt-2 text-red-500  absolute text-xs '>
                      {formik.errors.password}
                    </span>
                  ) : null}
                </div>

                <div className='relative  sm:mt-1 z-0 w-3/4 sm:py-5  xsm:py-2 group '>
                  <input
                    type='password'
                    name='ConfirmPassword'
                    id='ConfirmPassword'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ConfirmPassword}
                    className='block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='ConfirmPassword'
                    className='peer-focus:font-medium absolute text-lg text-gray-300  font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3'>
                    Re-Password{" "}
                  </label>
                  {formik.errors.ConfirmPassword &&
                    formik.touched.ConfirmPassword ? (
                    <span className='font-medium pt-2 text-red-500  absolute text-xs '>
                      {formik.errors.ConfirmPassword}
                    </span>
                  ) : null}
                  {console.log(formik.errors.password)}
                </div>

                <div className='btn-login w-full flex   items-center  justify-center xsm:py-5 sm:py-4 py-5 '>
                  {Loading ? (
                    <button
                      type='button'
                      className='text-white w-1/2 bg-gradient-to-r bg-[#191E3F] hover:bg-gradient-to-br   focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px]  py-1 text-center '>
                      {" "}
                      <span class={`${style.loader} `}></span>{" "}
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='text-white w-2/3 bg-gradient-to-r bg-[#191E3F] hover:bg-gradient-to-br    font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl  py-3 text-center me-2 mb-2'>
                      {" "}
                      Create account{" "}
                    </button>
                  )}
                </div>

                <div className='realtive py-4  '>
                  <p className='text-white text-sm  absolute sm:left-[60%] xsm:top-[87.5%] sm:top-[84%]  xsm:py-1 xsm:mt-1 xsm:left-32'>
                    {" "}
                    Already have an account
                    <Link
                      to='/login'
                      className={`font-bold ${style.login} ms-2`}>
                      Login
                    </Link>
                  </p>
                  <div className='underline relative  '>
                    <div className='line w-10 bg-white h-[0.125rem] absolute  sm:top-[1.7rem] sm:left-[13.5rem] xsm:top-4 xsm:left-28 lg:left-[13.5rem] md:left-[13.4rem] xl:left-[13.9rem]  '></div>
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
