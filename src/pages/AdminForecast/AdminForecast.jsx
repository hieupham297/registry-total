/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modalbox_registry } from "../../components/modalBox/modalBox_registry";
import { Modalbox_userDetail } from "../../components/modalBox/modalBox_userDetail";
import { SearchBar } from "../../components/searchBar/searchBar";
import { Select, Option } from "../../components/Select/Select";

export const AdminForecast = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openRegistry, setOpenRegistry] = useState(false);
  const [typeForecast, setTypeForecast] = useState("Chọn...");
  const [carData, setCarData] = useState([]);
  const [search, setSearch] = useState("");
  const pages = 10;
  const [typeLocation, setTypeLocation] = useState("Cả nước");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const regions = [
    "Chọn...",
    "Hà Nội",
    "Quảng Ninh",
    "Hải Phòng",
    "Thái Bình",
    "Nghệ An",
    "Cao Bằng",
    "Nam Định",
  ];
  const centers = [
    "Chọn...",
    "2916D",
    "1403D",
    "1503D",
    "1701D",
    "1702D",
    "3401D",
    "1101S",
    "1802S",
  ];

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

  const handleChangeLocation = (value) => {
    if (typeLocation === "Khu vực") {
      fetchCarByRegion(value);
    } else if (typeLocation === "Trung tâm") {
      fetchCarByCenter(value);
    }
  };

  const handleCountry = (value) => {
    if (value === "Cả nước") {
      setTypeLocation("Cả nước");
      fetchExpiringCars();
    } else {
      setTypeLocation(value);
    }
  };

  const fetchExpiringCars = (ttdk) => {
    fetch(`http://localhost:5000/cdk/getExpiringCars`, {
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

  const fetchCarByRegion = (location) => {
    fetch(`http://localhost:5000/cdk/getExpiringCarsByRegion/${location}`, {
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
        processPages(data.data.carList);
        setCarData(data.data.carList);
      })
      .catch((err) => console.log(err));
  };
  const fetchCarByCenter = (location) => {
    fetch(`http://localhost:5000/ttdk/getExpiringCars/${location}`, {
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
        processPages(data.data.carList);
        setCarData(data.data.carList);
      })
      .catch((err) => console.log(err));
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
            <Select label="Địa điểm" setValue={handleCountry}>
              <Option value="Cả nước" />
              <Option value="Khu vực" />
              <Option value="Trung tâm" />
            </Select>

            {typeLocation === "Khu vực" ? (
              <Select label="" setValue={handleChangeLocation}>
                {regions.map((item, index) => {
                  return <Option key={index} value={item}></Option>;
                })}
              </Select>
            ) : typeLocation === "Trung tâm" ? (
              <Select label="" setValue={handleChangeLocation}>
                {centers.map((item, index) => {
                  return <Option key={index} value={item}></Option>;
                })}
              </Select>
            ) : null}
          </div>
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
