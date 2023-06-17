import React, { useEffect, useState } from "react";
import "./forecast.css";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { DropdownDate } from "../../components/dropdownDate/dropdownDate";
import { NavLink } from "react-router-dom";
import { Modalbox_carDetail } from "../../components/modalBox/modalBox_carDetail";
import { Modalbox_registry } from "../../components/modalBox/modalBox_registry";
import { Modalbox_userDetail } from "../../components/modalBox/modalBox_userDetail";
import { Modalbox_company } from "../../components/modalBox/modalBox_company";
import { SearchBar } from "../../components/searchBar/searchBar";
import { Select, Option } from "../../components/Select/Select";

export const Forecast = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openRegistry, setOpenRegistry] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [typeForecast, setTypeForecast] = useState("Chọn...");
  const [carData, setCarData] = useState([]);
  const [search, setSearch] = useState("");
  const pages = 10;

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchExpiringCars(storedUser.code);
    }
  }, []);

  const fetchExpiringCars = (ttdk) => {
    fetch(`http://localhost:5000/ttdk/getExpiringCars/${ttdk}`, {
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
    <div className="statistical-cover">
      <div className="statistical-main">
        <div className="headbar   ">
          <SearchBar onSearch={handleSearch} />
          <div className="time-filter">
            <span className="outdated-car">
              Xe sắp hết hạn đăng kiểm: {carData.length}
            </span>
          </div>
          <div className="time-filter">
            <Select label="Dự báo" setValue={setTypeForecast}>
              <Option value="Chọn..." />
              <Option value="Xe đăng kiểm lại" />
              <Option value="Xe đăng kiểm mới" />
            </Select>
            {typeForecast === "Xe đăng kiểm lại" ? (
              <span className="number_of_car">{carData.length} xe</span>
            ) : typeForecast === "Xe đăng kiểm mới" ? (
              <span className="number_of_car">10 xe</span>
            ) : (
              <></>
            )}
          </div>
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
              <th>Ngày hết hạn</th>
              <th>Thông tin đăng kiểm</th>
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
                    <button
                      className="userclick"
                      onClick={() => {
                        setOpenUser(true);
                        setSelectedUser(car.ownerInfo);
                      }}
                    >
                      {car.object === "Cá nhân"
                        ? car.ownerInfo.ownerName
                        : car.ownerInfo.unitName}
                    </button>
                    <Modalbox_userDetail
                      triggerUser={openUser}
                      setTriggerUser={setOpenUser}
                      value="Thông tin chủ sở hữu"
                      userData={selectedUser}
                    />
                  </td>
                  <td>{new Date(car.regisDate).toLocaleDateString("en-GB")}</td>
                  <td>
                    {new Date(car.expirationDate).toLocaleDateString("en-GB")}
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        setOpenRegistry(true);
                        setSelectedCar(car);
                      }}
                    >
                      Chi tiết
                    </button>
                    <Modalbox_registry
                      triggerRegistry={openRegistry}
                      setTriggerRegistry={setOpenRegistry}
                      value="Thông tin đăng kiểm"
                      carData={selectedCar}
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
