import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

export default function NotFound() {
  return (
    <div className="w-full text-center">
      <img
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="not-found"
        className="w-full h-full object-cover"
      />
      <Link to={config.routes.home} className="text-[20px] mt-[16px] inline-block font-semibold">
        Go Home
      </Link>
    </div>
  );
}
