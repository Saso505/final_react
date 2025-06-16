/* eslint-disable */

import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={`footer ${style.bgfooter} shadow-2xl py-5`}>
        <footer className='py-5'>
          <div className='w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between py-5'>
            {/* Contact Info Section */}

            <div className='text-lg text-white dark:text-white'>
              <p className='flex items-center py-2'>
                <i className='fa-regular fa-envelope pe-2'></i>
                <span>hey251@gmail.com</span>
              </p>
              <p className='flex items-center py-2'>
                <i className='fa-solid fa-phone pe-2'></i>
                <span>+21117459634</span>
              </p>
            </div>

            {/* Footer Brand or Info Section */}
            <ul className='flex flex-wrap items-center text-lg font-medium text-white dark:text-white'>
              <li>Create by Lairs</li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
