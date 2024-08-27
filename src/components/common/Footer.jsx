import Link from "next/link";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitterSquare,
} from "react-icons/fa";
import {
  FaLocationDot,
  FaSquareGithub,
  FaSquareInstagram,
} from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#181818] p-5">
      <div className="max-w-screen-2xl mx-auto rounded-md py-10 px-4 sm:px-5 text-gray-800 sm:flex justify-between  bg-white dark:bg-dark">
        <div className="p-5 sm:w-3/12 sm:border-r">
          <div className="text-sm uppercase text-primary font-bold">Menu</div>
          <ul className="dark:text-gray-400">
            <li className="my-2">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
            </li>
            <li className="my-2">
              <Link className="hover:text-primary" href="/profile">
                Profile
              </Link>
            </li>
            <li className="my-2">
              <Link className="hover:text-primary" href="/about">
                About
              </Link>
            </li>
            <li className="my-2">
              <Link className="hover:text-primary" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-5 sm:w-6/12 sm:border-r text-center">
          <h3 className="font-bold text-xl text-primary mb-4">Componentity</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">
            Dive into a world of engaging blogs and thought-provoking content on
            Writers’ Thoughts. Whether you’re looking for insightful articles,
            compelling stories, or the latest trends, our site offers a curated
            selection of posts that cater to diverse interests. Explore, read,
            and connect with a community of passionate writers and readers. Join
            us and let your curiosity lead the way!
          </p>
        </div>
        <div className="p-5 sm:w-3/12">
          <div className="text-sm uppercase text-primary font-bold">
            Contact Us
          </div>
          <ul className="dark:text-gray-400">
            <li className="my-2 flex gap-2 items-center">
              <FaLocationDot />
              <Link className="hover:text-primary" href="#">
                512, Floor 4 San Francisco, CA
              </Link>
            </li>
            <li className="my-2 flex gap-2 items-center">
              <IoMdMail />
              <Link className="hover:text-primary" href="#">
                contact@company.com
              </Link>
            </li>
            <li className="my-2 flex gap-2 items-center">
              <FaPhoneAlt />
              <Link className="hover:text-primary" href="#">
                +1 123-456-7890
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex py-5  text-gray-800 dark:text-gray-500 text-sm flex-col items-center border-t  bg-white dark:bg-dark relative">
        <div className="md:flex-auto mt-2 flex-row flex gap-3">
          <a
            href="https://github.com/devdashk66"
            target="_blank"
            className="w-6 mx-1"
          >
            <FaSquareGithub className="text-gray-500 dark:text-white dark:hover:text-primary hover:text-primary w-full h-full dark:hover:bg-white rounded duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/devdashk66"
            target="_blank"
            className="w-6 mx-1"
          >
            <FaLinkedin className="text-gray-500 dark:text-white dark:hover:text-primary hover:text-primary w-full h-full dark:hover:bg-white rounded duration-300" />
          </a>
          <a
            href="https://x.com/devdashk66"
            target="_blank"
            className="w-6 mx-1"
          >
            <FaTwitterSquare className="text-gray-500 dark:text-white dark:hover:text-primary hover:text-primary w-full h-full dark:hover:bg-white rounded duration-300" />
          </a>
          <a
            href="https://www.instagram.com/devdashk_66"
            target="_blank"
            className="w-6 mx-1"
          >
            <FaSquareInstagram className="text-gray-500 dark:text-white dark:hover:text-primary hover:text-primary w-full h-full dark:hover:bg-white rounded duration-300" />
          </a>
          <a
            href="https://www.facebook.com/devdashk66"
            target="_blank"
            className="w-6 mx-1"
          >
            <FaFacebookSquare className="text-gray-500 dark:text-white dark:hover:text-primary hover:text-primary w-full h-full dark:hover:bg-white rounded duration-300 " />
          </a>
        </div>
        <div className="my-5">
          © Copyright 2024. All Rights Reserved by{" "}
          <a
            className="text-primary font-semibold hover:underline duration-300"
            target="_blank"
            href="https://www.linkedin.com/in/devdashk66"
          >
            Dev
          </a>
          .
        </div>
        <p className="text-[10px] absolute bottom-1 right-3">
          Created on 27-08-2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
