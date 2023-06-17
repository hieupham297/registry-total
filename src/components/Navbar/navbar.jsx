import "./navbar.css";
import car from "../../assets/car_logo 1.png";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

function Navbar(props) {
  const [open, setOpen] = useState(false);
  const activeLink = "activeLink";
  const normalLink = "";
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      {props.type === "cdk" ? (
        <div className="navbar">
          <div className="logo">
            <NavLink to="all-car">
              <img src={car} alt="" />
            </NavLink>
          </div>
          {user ? (
            <NavLink to="user_info" className="login login_admin_responsive">
              {user.userName}
            </NavLink>
          ) : (
            <NavLink to="/login" className="login login_admin_responsive">
              Đăng nhập
            </NavLink>
          )}
        </div>
      ) : (
        <div className="navbar">
          <div className="logo">
            <NavLink to="homepage">
              <img src={car} alt="" />
            </NavLink>
          </div>
          <div className="list_nav">
            <NavLink
              to="homepage"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="news"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Tin tức
            </NavLink>
            <NavLink
              to={isLoggedIn ? "major/approve" : "login"}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Nghiệp vụ {isLoggedIn}
            </NavLink>
            <NavLink
              to="contact"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Liên hệ
            </NavLink>
          </div>
          {user ? (
            <NavLink to="user_info" className="login">
              {user.displayName}
            </NavLink>
          ) : (
            <NavLink to="/login" className="login">
              Đăng nhập
            </NavLink>
          )}

          <div className="menu_responsive">
            <button
              className="menu_responsive_button"
              onClick={() => setOpen(true)}
            >
              <List weight="bold" />
            </button>
            {open === true ? (
              <div className="list_nav_res_wrapper">
                <div className="list_nav_responsive">
                  <div className="menu_responsive_title">
                    <h4>Menu</h4>
                    <div className="close_menu_responsive">
                      <button onClick={() => setOpen(false)}>
                        <X />
                      </button>
                    </div>
                  </div>
                  <NavLink
                    to="homepage"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    onClick={() => setOpen(!open)}
                  >
                    Trang chủ
                  </NavLink>
                  <NavLink
                    to="news"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    onClick={() => setOpen(!open)}
                  >
                    Tin tức
                  </NavLink>
                  <NavLink
                    to={isLoggedIn ? "ttdk/major/approve" : "login"}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    onClick={() => setOpen(!open)}
                  >
                    Nghiệp vụ {isLoggedIn}
                  </NavLink>
                  <NavLink
                    to="contact"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    onClick={() => setOpen(!open)}
                  >
                    Liên hệ
                  </NavLink>
                  {user ? (
                    <NavLink to="user_info" className="login">
                      {user.userName}
                    </NavLink>
                  ) : (
                    <NavLink to="/login" className="login">
                      Đăng nhập
                    </NavLink>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Navbar;
