/* eslint-disable */

import React, { useContext, useEffect, useState, useRef } from "react";
import style from "./Navbar.module.css";
import navLogo from "../../assets/navLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SectionId } from "../sectionId/Section";
import { UserContext } from "../../Context/UserContext";
import { gsap } from "gsap";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  let { userData, setUserData } = useContext(UserContext);

  const logoRef = useRef(null);
  const menuItemsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(logoRef.current, {
      duration: 1,
      opacity: 0,
      y: 100,
    });
    tl.from(
      menuItemsRef.current,
      {
        duration: 1,
        opacity: 0,
        y: 100,
      },
      "-=0.3"
    );
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/home" || path === "/") {
      setActiveLink("home");
    } else if (path === "/archives") {
      setActiveLink("archives");
    } else if (path === "/profile") {
      setActiveLink("profile");
    } else {
      const sectionId = path.slice(1);
      if (SectionId.includes(sectionId)) {
        setActiveLink(sectionId);
      }
    }
  }, [location.pathname]);

  function handelLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    setUserData(null);
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const scrollToY = element.offsetTop;
      window.scrollTo({ top: scrollToY, behavior: "smooth" });
      setActiveLink(sectionId);
    }
    setIsMenuOpen(false);
  };

  const handlePageNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const determineActiveSection = () => {
    if (!SectionId || SectionId.length === 0) return;

    let isAnySectionActive = false;

    for (let i = SectionId.length - 1; i >= 0; i--) {
      const section = document.getElementById(SectionId[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveLink(SectionId[i]);
          isAnySectionActive = true;
          break;
        }
      }
    }

    if (!isAnySectionActive) {
      setActiveLink("home");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
      determineActiveSection();
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  return (
    <nav
      className={`header ${style.navbarTransition} ${isScrolled ? style.scrolled : ""
        } fixed w-full md:py-5 py-0 z-20 top-0 `}
    >
      <div
        className="logo max-w-screen-xl flex items-center justify-between mx-auto"
        ref={logoRef}
      >
        {/* Logo */}
        <a href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img className='md:w-20 xsm:w-14' src={navLogo} alt='Nav Logo' />
          <span className='self-center text-lg font-lato font-semibold   lg:hidden xsm:flex mb-1 whitespace-nowrap text-slate-100'>
            Eye of Veritas
          </span>
        </a>

        {!userData ? (
          <div className='md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <button
              type='button'
              className={`${style.nlogin} lg:px-[3rem] md:px-[1.5rem] text-white xsm:hidden md:flex focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center`}>
              <Link to='/login'>Login</Link>
            </button>
          </div>
        ) : (
          <div className='md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <button
              type='button'
              onClick={handelLogout}
              className={`${style.nlogin}   lg:px-[3rem] md:px-[1.5rem] text-white xsm:hidden md:flex focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-4 py-2 text-center`}>
              Logout
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <div
          ref={menuItemsRef}
          className={`menu_items ${style.glassNavcontainer} ${isMenuOpen
            ? "flex absolute top-20 left-0 right-0 rounded"
            : "hidden"
            } md:px-[1rem] lg:px-[3rem] md:py-[0.3rem] lg:py-[0.5rem] md:rounded-full md:space-x-8 rounded-md items-center justify-between md:flex md:w-auto md:order-1`}
          id='navbar-menu'>
          <ul className='flex flex-col md:flex-row items-center gap-4 md:gap-8 xsm:w-full md:w-auto md:bg-transparent md:rounded-full p-4 md:p-0 xsm:justify-center'>
            <li
              className={`${activeLink === "home"
                ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#62c7f3e7]`
                : ""
                }`}>
              <button
                onClick={() => handlePageNavigation("/home")}
                className={`block font-lato xl:mx-2 xl:px-2  rounded ${activeLink === "home"
                  ? `text-[#62c7f3e7] font-semibold `
                  : "text-slate-100"
                  }`}>
                Home
              </button>
            </li>

            {SectionId.map((sectionId, i) => (
              <li
                key={i}
                className={`${activeLink === sectionId
                  ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#62c7f3e7]`
                  : ""
                  }`}>
                <button
                  onClick={() => scrollToSection(sectionId)}
                  className={`block font-lato xl:mx-2 xl:px-2 rounded  ${activeLink === sectionId
                    ? `text-[#62c7f3e7] font-semibold`
                    : "text-slate-100"
                    }`}>
                  {sectionId}
                </button>
              </li>
            ))}

            {userData && (
              <>
                <li
                  className={`${activeLink === "archives"
                    ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#62c7f3e7]`
                    : ""
                    }`}>
                  <button
                    onClick={() => handlePageNavigation("/archives")}
                    className={`block font-lato xl:mx-2 xl:px-2 rounded  ${activeLink === "archives"
                      ? `text-[#62c7f3e7] font-semibold`
                      : "text-slate-100"
                      }`}>
                    Archives
                  </button>
                </li>
                <li
                  className={`${activeLink === "profile"
                    ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#62c7f3e7]`
                    : ""
                    }`}>
                  <button
                    onClick={() => handlePageNavigation("/profile")}
                    className={`block font-lato xl:mx-2 xl:px-2 rounded   ${activeLink === "profile"
                      ? ` text-[#62c7f3e7] font-semibold`
                      : "text-slate-100"
                      }`}>
                    Profile
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls='navbar-menu'
          aria-expanded={isMenuOpen}
          type='button'
          className='bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden cursor-pointer xsm:flex hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
