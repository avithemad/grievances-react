import React from "react";
import { Outlet, Link } from "react-router-dom";

function Header() {
  const [menuEnabled, setMenuEnabled] = React.useState(false);
  const toggleMenu = () => {
    setMenuEnabled(!menuEnabled);
  };
  return (
    <div onClick={() => menuEnabled && setMenuEnabled(!menuEnabled)}>
      <div className="flex items-center bg-white dark:bg-black">
        <button className="px-4 sm:hidden active:opacity-50" onClick={toggleMenu}>
          🍔
        </button>
        <h1 className="px-4 py-2 text-3xl">MIOM GRIEVANCE</h1>
        <ul className="sm:flex ml-auto mr-2 hidden">
          <li className="mx-2 px-1 py-2  rounded  ">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-2 px-1 py-2  rounded  ">
            <Link to="/newcomplaint">Lodge complaint</Link>
          </li>
          <li className="mx-2 px-1 py-2  rounded  ">
            <Link to="/qrscanner">Dak service</Link>
          </li>
        </ul>
      </div>

      <div className={`transition-all absolute h-screen z-50 flex bg-slate-900 text-slate-200 sm:hidden dark:bg-slate-200 dark:text-slate-900 ${menuEnabled ? "translate-x-0 " : "-translate-x-full"
        }`}>
        <ul className="flex-col ">
          <li className=" px-6 py-2  font-semibold rounded active:bg-gray-400 transition-all">
            <Link to="/">Home</Link>
          </li>
          <li className=" px-6 py-2 font-semibold  rounded active:bg-gray-400 transition-all">
            <Link to="/newcomplaint">Lodge complaint</Link>
          </li>
          <li className=" px-6 py-2 font-semibold  rounded active:bg-gray-400 transition-all">
            <Link to="/qrscanner">Dak service</Link>
          </li>
        </ul>
      </div>
      <div className={`${menuEnabled ? "opacity-50" : "opacity-100"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Header;
