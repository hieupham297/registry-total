import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { DropdownDate } from "../../components/dropdownDate/dropdownDate";
import "./approve.css";
import { NavLink } from "react-router-dom";
import { SearchBar } from "../../components/searchBar/searchBar";
import { ApproveProfile } from "../ApproveProfile/approveProfile";

export const Approve = () => {
  const [carData, setCarData] = useState([]);
  const [search, setSearch] = useState("");
  const [openApprove, setOpenApprove] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState([]);
  const pages = 10;
  const handleSearch = (value) => {
    setSearch(value);
  };

  const processPages = (list) => {
    const temp = list.filter((car) =>
      car.licensePlate.toLowerCase().includes(search.toLowerCase())
    );
    const newList = temp.reduce((acc, cur, i) => {
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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchData(storedUser.code);
    }
  }, []);

  const fetchData = (ttdk) => {
    fetch(`http://localhost:5000/ttdk/uncensored/${ttdk}`, {
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
        setCarData(data.data.carList);
        processPages(data.data.carList);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="Approve-cover">
      <div className="Approve-main">
        <div className="headbar">
          <SearchBar onSearch={handleSearch} />
        </div>
        <table>
          <thead>
            <tr>
              <th className="number_on_table">STT</th>
              <th>Biển số xe</th>
              <th>Nhãn hiệu</th>
              <th>Số loại</th>
              <th>Số khung</th>
              <th>Số máy</th>
              <th>Chủ sở hữu</th>
              <th>Ngày đăng kiểm</th>
              <th>Phê duyệt</th>
            </tr>
          </thead>
          <tbody>
            {pageData[currentPage] &&
              pageData[currentPage].map((car, index) => (
                <tr key={index}>
                  <td className="number_on_table">{index + 1}</td>
                  <td>{car.licensePlate}</td>
                  <td>{car.mark}</td>
                  <td>{car.modelCode}</td>
                  <td>{car.chassisNumber}</td>
                  <td>{car.engineNumber}</td>
                  <td>
                    {car.object === "Cá nhân"
                      ? car.ownerInfo.ownerName
                      : car.ownerInfo.unitName}
                  </td>
                  <td>{new Date(car.regisDate).toLocaleDateString("en-GB")}</td>
                  <td>
                    <button
                      onClick={() => {
                        setOpenApprove(true);
                        setSelectedInfo(car);
                      }}
                    >
                      Chi tiết
                    </button>
                    <ApproveProfile
                      trigger={openApprove}
                      setTrigger={setOpenApprove}
                      data={selectedInfo}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
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
                className={currentPage == count ? "activePage" : "otherPage"}
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
