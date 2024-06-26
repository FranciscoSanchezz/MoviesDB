import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSetActive = (route: string) => {
    setActiveLink(route);
  };

  const linkClass = (route: string) =>
    `flex-none w-22 font-semibold m-4 mt-7 float-right text-xl ${
      activeLink === route ? "text-rose-600" : "text-black"
    }`;

  return (
    <div className="bg-white h-20 shadow-md">
      <div className="flex space-x-8 mr-24">
        <a className="flex-1 w-1/2 text-2xl text-gray-600 font-bold mx-5 my-6" href="/">Movies DB</a>
        <div className={linkClass(ROUTES.HOME)} onClick={() => handleSetActive(ROUTES.HOME)}><Link to={ROUTES.HOME}>HOME</Link></div>
        <div className={linkClass(ROUTES.POPULAR)} onClick={() => handleSetActive(ROUTES.POPULAR)}><Link to={ROUTES.POPULAR}>POPULAR</Link></div>
        <div className={linkClass(ROUTES.TOPRATED)} onClick={() => handleSetActive(ROUTES.TOPRATED)}><Link to={ROUTES.TOPRATED}>TOP RATED</Link></div>
        <div className={linkClass(ROUTES.NOWPLAYING)} onClick={() => handleSetActive(ROUTES.NOWPLAYING)}><Link to={ROUTES.NOWPLAYING}>NOW PLAYING</Link></div>
        <div className={linkClass(ROUTES.FAVORITES)} onClick={() => handleSetActive(ROUTES.FAVORITES)}><Link to={ROUTES.FAVORITES}>FAVORITES</Link></div>
      </div>
    </div>
  );
}

export default Header;