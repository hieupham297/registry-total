import React from "react";
import "./sidebar.css";
import {
  Stack,
  ChartBar,
  CheckSquareOffset,
  Calendar,
  UserCirclePlus,
  UserList,
} from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";

export const Sidebar = (props) => {
  const activeLink = "activeSideLink";

  return (
    <>
      <div className="content-wrapper">
        {props.type === "cdk" ? (
          <div className="sidebar-main">
            <div className="sidebar-content">
              <div className="title">
                <Stack /> Nghiệp vụ
              </div>
              <div></div>{" "}
              <div>
                <NavLink
                  to="statistical"
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  <ChartBar weight="bold" />
                  <div>Thống kê xe đăng kiểm</div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="forecast"
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  <Calendar weight="bold" />
                  <div>Xe sắp hết hạn đăng kiểm</div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="add-account"
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  <UserCirclePlus weight="bold" />
                  <div>Thêm tài khoản</div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="list-account"
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  <UserList weight="bold" />
                  <div>Danh sách tài khoản</div>
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="sidebar-main">
            <div className="sidebar-content">
              <div className="title">
                <Stack /> Nghiệp vụ{" "}
              </div>
              <div>
                <NavLink
                  to="approve"
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  <CheckSquareOffset weight="bold" />
                  <div>Phê duyệt và cấp chứng nhận</div>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="statistical"
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  <ChartBar weight="bold" />
                  <div>Thống kê</div>
                </NavLink>
              </div>
              {/* <div className='little'><NavLink to="/major/list" className={({isActive}) => (isActive ? activeLink : normalLink)}><ListChecks weight="bold"/> Danh sách</NavLink></div> */}
              <div className="little">
                <NavLink
                  to="forecast"
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  <Calendar weight="bold" />
                  <div>Xe sắp hết hạn đăng kiểm</div>
                </NavLink>
              </div>
              {/* <div className='big'><NavLink to="/major/add_account" className={({isActive}) => (isActive ? activeLink : normalLink)}><UserCirclePlus weight="bold"/> Thêm tài khoản</NavLink></div> */}
              {/* <div className='big'><NavLink to="/major/list_account" className={({isActive}) => (isActive ? activeLink : normalLink)}><UserList weight="bold"/> Danh sách tài khoản</NavLink></div>         */}
            </div>
          </div>
        )}

        <div className="inner-content-sidebar">
          <Outlet />
        </div>
      </div>
    </>
  );
};
