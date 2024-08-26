"use client";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const SocialShare = ({ title }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="pt-5">
        <div className="flex justify-center space-x-4">
          <FacebookShareButton url={url} quote={title}>
            <div
              title="Share by Facebook"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300"
            >
              <FaFacebook className="text-white" />
            </div>
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <div
              title="Share by Twitter"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 hover:bg-blue-500 transition duration-300"
            >
              <FaTwitter className="text-white" />
            </div>
          </TwitterShareButton>
          <LinkedinShareButton url={url} title={title}>
            <div
              title="Share by LinkedIn"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 transition duration-300"
            >
              <FaLinkedin className="text-white" />
            </div>
          </LinkedinShareButton>
          <WhatsappShareButton url={url} title={title}>
            <div
              title="Share by WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 transition duration-300"
            >
              <FaWhatsapp className="text-white" size={24} />
            </div>
          </WhatsappShareButton>
          <TelegramShareButton url={url} title={title}>
            <div
              title="Share by Telegram"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300"
            >
              <FaTelegram className="text-white" size={24} />
            </div>
          </TelegramShareButton>
          <EmailShareButton url={url} subject={title}>
            <div
              title="Share by Email"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-800 transition duration-300"
            >
              <FaEnvelope className="text-white" size={24} />
            </div>
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
