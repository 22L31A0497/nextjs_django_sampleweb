"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const NAME = "Jaganmohan Rao Kuna";
  const DESCRIPTION = "All rights reserved © 2025";

  const SOCIAL_LINKS = {
    github: "https://github.com/22L31A0497",
    linkedin: "https://www.linkedin.com/in/jaganmohanraokuna-fullstack/",
    twitter: "https://x.com/JaganMo88789011",
    insta: "https://www.instagram.com/jaganmohan_rao_kuna/",
    facebook: "https://www.facebook.com/jagan.kuna.71/"
  };

  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <p className="text-lg font-semibold">{NAME}</p>
        <p className="text-sm">{DESCRIPTION}</p>
      </div>

      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4 mt-2">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-orange-500 transition" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-500 transition" />
          </a>
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-sky-400 transition" />
          </a>
          <a href={SOCIAL_LINKS.insta} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-pink-500 transition" />
          </a>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-blue-700 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
