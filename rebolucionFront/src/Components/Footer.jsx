import React from 'react';
import { FaYoutube as YoutubeIcon } from "react-icons/fa";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";
import { FaInstagram as InstagramIcon } from "react-icons/fa";
import { FaTiktok as TiktokIcon } from "react-icons/fa";

// Componente para los íconos
const IconLink = ({ href, icon: Icon, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${className} p-2 rounded-full hover:scale-105 transition-transform duration-200`}
  >
    <Icon size={24} />
  </a>
);

// Footer principal
const Footer = () => {
  return (
    <footer className="back-blanco blanco py-4 flex justify-center items-center">
      <div className="flex gap-4">
        <IconLink
          href="https://www.youtube.com/@RebolucionLatam"
          icon={YoutubeIcon}
          className="violeta hover:text-naranja"
        />
        <IconLink
          href="https://open.spotify.com/show/3EyKX9xEgU0K7WfyWXI9Sr"
          icon={SpotifyIcon}
          className="violeta hover:text-naranja"
        />
        <IconLink
          href="https://www.instagram.com/rebolucionlatam/"
          icon={InstagramIcon}
          className="violeta hover:text-naranja"
        />
        <IconLink
          href="https://www.tiktok.com/@rebolucionlatam?_t=8sC9yxzcj2L&_r=1"
          icon={TiktokIcon}
          className="violeta hover:text-naranja"
        />
      </div>
    </footer>
  );
};

export default Footer;
