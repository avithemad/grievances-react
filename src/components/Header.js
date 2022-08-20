import React from "react";
import { Outlet, Link } from "react-router-dom";

function Header() {
  const [menuEnabled, setMenuEnabled] = React.useState(false);
  const toggleMenu = () => {
    setMenuEnabled(!menuEnabled);
  };
  return (
    <>
      <div className="flex items-center bg-white dark:bg-black">
        <button className="px-4 sm:hidden" onClick={toggleMenu}>
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
      <div className="flex">
        {menuEnabled && (
          <div className="h-screen w-2/6  m-0 flex bg-slate-900 text-slate-200 sm:hidden dark:bg-slate-200 dark:text-slate-900">
            <ul className="flex-col ml-auto mr-2 ">
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
        )}
        <Outlet />
      </div>
    </>
  );
}

export default Header;
