import React from "react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaMobileAlt,
  FaRegClock,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import Image from "next/image";
import Logo from "../public/logo.png";
const Header = ({ WebSiteSettings }) => {
  return (
    <React.Fragment>
      <div>
        <div className="bg-gray-100 ">
          <div className="container mx-auto lg:flex lg:flex-row  lg:justify-between justify-center items-center space-y-2  text-gray-500 py-3 w-full">
            <div className="lg:flex lg:flex-row flex flex-col justify-center items-center space-x-12 lg:space-y-0 space-y-2">
              <div className="flex flex-row space-x-2">
                <FaMapMarkerAlt className="w-5 h-5 text-gray-500" />
                <p> {WebSiteSettings?.themeOptions?.siteAddress} </p>
              </div>
              <div className="flex flex-row space-x-2">
                <FaMobileAlt className="w-5 h-5 text-gray-500" />
                <p> {WebSiteSettings?.themeOptions?.sitePhoneNumber} </p>
              </div>
              <div className="flex flex-row space-x-2">
                <FaRegClock className="w-5 h-5 text-gray-500" />
                <p>{WebSiteSettings?.themeOptions?.openingHours} </p>
              </div>
            </div>
            <div className="flex flex-row space-x-4  justify-center items-center ">
              {WebSiteSettings?.themeOptions?.socialProfiles?.map((item) => (
                <a
                  target="_blank"
                  href={item.profileAddress}
                  dangerouslySetInnerHTML={{ __html: item.profileIcon }}
                />
              ))}
            </div>
          </div>
        </div>
        <nav className=" px-2 sm:px-4 py-5 ">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link href="/">
              <a href="./" className="flex">
                <img src={WebSiteSettings?.themeOptions?.logo?.sourceUrl} />
              </a>
            </Link>
            <div className="flex md:order-2">
              <Link href={WebSiteSettings?.themeOptions?.buttonUrl}>
                <a
                  className="text-gray-700 hover:text-white hover:bg-yellow-600 border-2 border-yellow-500   rounded-3xl  px-5 py-2.5 text-center mr-3 md:mr-0 "
                  aria-current="page"
                  href={WebSiteSettings?.themeOptions?.buttonUrl}
                >
                  {WebSiteSettings?.themeOptions?.buttonText}
                </a>
              </Link>

              <button
                data-collapse-toggle="mobile-menu-4"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-4"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
              id="mobile-menu-4"
            >
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0  ">
                <li key="./">
                  <Link href="./">
                    <a
                      className="block py-2 pr-4 pl-3 text-yellow-600  md:hover:text-yellow-500 md:p-0 "
                      aria-current="page"
                      href="./"
                    >
                      Home
                    </a>
                  </Link>
                </li>
                <li key="./about-us">
                  <Link href="./about-us">
                    <a
                      className="block py-2 pr-4 pl-3 text-yellow-600  md:hover:text-yellow-500 md:p-0 "
                      aria-current="page"
                      href="./about-us"
                    >
                      About Us
                    </a>
                  </Link>
                </li>
                <li key="./contact-us">
                  <Link href="./contact-us">
                    <a
                      className="block py-2 pr-4 pl-3 text-yellow-600  md:hover:text-yellow-500 md:p-0 "
                      aria-current="page"
                      href="./contact-us"
                    >
                      Contact Us
                    </a>
                  </Link>
                </li>
                <li key="./blog">
                  <Link href="./blog">
                    <a
                      className="block py-2 pr-4 pl-3 text-yellow-600  md:hover:text-yellow-500 md:p-0 "
                      aria-current="page"
                      href="./blog"
                    >
                      Blog
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
