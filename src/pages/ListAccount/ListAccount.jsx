/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ListAccount.css";
import {
  PencilSimpleLine,
  Trash,
  ToggleLeft,
  ToggleRight,
  DotOutline,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { EditAccount } from "../EditAccount/editAccount";

export const ListAccount = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const pages = 10;
  const activePage = "activePage";

  const fetchData = () => {
    fetch("http://localhost:5000/cdk/getAllCenter", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        processPages(data.data);
      })
      .catch((err) => console.log(err));
  };

  const processPages = (userList) => {
    const newList = userList.reduce((acc, cur, i) => {
      const index = Math.floor(i / pages);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(cur);
      return acc;
    }, []);
    setPageData(newList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = (email) => {
    fetch(`http://localhost:5000/cdk/deleteAcc/${email}`, {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Xóa tài khoản thành công");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const prevPages = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPages = () => {
    if (currentPage < pageData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="listAccount-container">
      <div className="listAccount-main">
        <table>
          <thead>
            <tr>
              <th className="number_on_table">STT</th>
              <th>Tên trung tâm</th>
              <th>Khu vực</th>
              <th>Số điện thoại</th>
              <th>Người đại diện</th>
              <th>Chức danh</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Chỉnh sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          {pageData[currentPage] &&
            pageData[currentPage].map((item, index) => {
              return (
                <tr key={index}>
                  <td className="number_on_table">{index + 1}</td>
                  <td>{item.displayName}</td>
                  <td>{item.region}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.represent}</td>
                  <td>{item.position}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.status === "Đang hoạt động" ? (
                      <DotOutline color="green" size={64} weight="fill" />
                    ) : (
                      <DotOutline color="red" size={64} weight="fill" />
                    )}
                  </td>
                  <td>
                    <NavLink>
                      <button
                        className="edit_button"
                        onClick={() => {
                          setOpen(true);
                          setSelectedInfo(item);
                        }}
                      >
                        <PencilSimpleLine />
                      </button>
                      <EditAccount
                        trigger={open}
                        setTrigger={setOpen}
                        data={item}
                      ></EditAccount>
                    </NavLink>
                  </td>
                  <td>
                    <button
                      className="delete_button"
                      onClick={() => {
                        deleteUser(item.email);
                      }}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>

        <div className="table-nav">
          <button
            onClick={() => {
              prevPages();
            }}
            className="state"
          >
            Trang trước
          </button>
          {pageData.map((item, count) => {
            return (
              <button
                onClick={() => {
                  setCurrentPage(count);
                }}
                className={currentPage === count ? "activePage" : "otherPage"}
              >
                {count + 1}
              </button>
            );
          })}
          <button
            onClick={() => {
              nextPages();
            }}
            className="state"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};
