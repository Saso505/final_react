/* eslint-disable */
import React from "react";
import style from "./Contact.module.css";
import imgContact from "../../assets/contact-img.svg";


export default function Contact() {
  return (
    <>
      <div id='Contact' className='contact py-32  w-full   '>
        {/* Outer container with border */}
        <div className='head-contact flex justify-center items-center py-10'>
          <h1 className='font-Abril text-slate-100  text-5xl'>Contact</h1>
        </div>

        {/* Image Section */}

        <div className='  w-3/4  flex   justify-center items-center border-gray-300 md:px-8 md:py-20  xsm:p-3 xsm:rounded-[40px] md:rounded-[70px] shadow-lg    border-4 mx-auto'>
          <div className='imge xsm:hidden  md:flex'>
            <img src={imgContact} alt='contact' className=' w-full mx-auto' />
          </div>

          <form className='w-full xsm:flex xsm:justify-center xsm:items-center xsm:flex-col px-4 '>
            <div className='relative pt-5 sm:mt-1 z-0 w-3/4 sm:py-4 xsm:py-3 group '>
              <input
                type='email'
                name='emial-cont'
                id='emial-cont'
                className='block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-slate-100 dark:text-slate-100   dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300   peer'
                placeholder=' '
              />
              <label
                htmlFor='emial-cont'
                className='peer-focus:font-medium absolute  font-lato text-lg    text-slate-100 dark:text-slate-100 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4'>
                Email{" "}
              </label>
            </div>

            <label
              htmlFor='message'
              className='block sm:mt-1 z-0 w-3/4 sm:py-4 xsm:py-3 font-lato  font-medium text-slate-100 dark:text-slate-100'>
              Your message
            </label>

            <textarea
              id='message'
              rows='4'
              className={`block p-2.5 w-3/4 text-sm rounded-lg  text-[#262463]    dark:text-[#262463] dark:placeholder-gray-400  focus:ring-white/50 dark:focus:ring-white/50 focus:ring-2 focus:outline-none  resize-none ${style.bgmessage}`}
              placeholder='Write your thoughts here...'></textarea>

            {/* Submit Button */}
            <div className='btn-contact flex items-end w-3/4 py-7 justify-end'>
              <button
                type='submit'
                className=' py-2 text-lg font-lato bg-[#99BBFE] w-28 text-slate-100 dark:text-slate-100 rounded-lg mt-4 focus:ring-2 focus:outline-none focus:ring-white/50 dark:focus:ring-white/50 dark:hover:bg-[#476db8]'>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
