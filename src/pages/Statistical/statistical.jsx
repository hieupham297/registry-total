/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import "./statistical.css";
import { Modalbox_carDetail } from "../../components/modalBox/modalBox_carDetail";
import { Modalbox_registry } from "../../components/modalBox/modalBox_registry";
import { Modalbox_userDetail } from "../../components/modalBox/modalBox_userDetail";
import { Modalbox_company } from "../../components/modalBox/modalBox_company";
import { SearchBar } from "../../components/searchBar/searchBar";
import { Select, Option } from "../../components/Select/Select";
export const Statistical = () => {
  const [userId, setUserId] = useState("");
  const [openUser, setOpenUser] = useState(false);
  const [openCar, setOpenCar] = useState(false);
  const [openRegistry, setOpenRegistry] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [typeLocation, setTypeLocation] = useState("Cả nước");
  const [location, setLocation] = useState("Khu vực");
  const [typeTime, setTypeTime] = useState("Chọn...");
  const [time, setTime] = useState("Quý");
  const [carData, setCarData] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState([]);
  const pages = 10;

  const months = [
    "Chọn...",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const quarters = ["Chọn...", "1", "2", "3", "4"];
  const years = ["Chọn...", "2023", "2022", "2021", "2020"];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchData(storedUser.code);
      setUserId(storedUser.code);
    }
  }, []);

  const fetchData = (ttdk) => {
    fetch(`http://localhost:5000/ttdk/statistics/${ttdk}`, {
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

  const fetchCarByQuater = (year) => {
    fetch(
      `http://localhost:5000/ttdk/getCarByQuarterYear/${userId}/${time}/${year}`,
      {
        method: "GET",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        processPages(data.data.carList);
      })
      .catch((err) => console.log(err));
  };

  const fetchCarByMonth = (year) => {
    fetch(
      `http://localhost:5000/ttdk/getCarByQuarterYear/${userId}/${time}/${year}`,
      {
        method: "GET",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        processPages(data.data.carList);
      })
      .catch((err) => console.log(err));
  };

  const fetchCarByYear = (year) => {
    fetch(`http://localhost:5000/cdk/getCarByYear/${year}`, {
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
      })
      .catch((err) => console.log(err));
  };

  const handleChangeTime = (value) => {
    if (typeTime === "Năm") {
      fetchCarByYear(value);
    } else if (typeLocation === "Quý") {
      console.log(time, value);
      fetchCarByQuater(value);
    } else {
      console.log(time, value);
      fetchCarByMonth(value);
    }
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
        <div className="headbar">
          <SearchBar onSearch={handleSearch} />
          <div className="time-filter special">
            <Select label="Thời gian" setValue={setTypeTime}>
              <Option value="Chọn..." />
              <Option value="Tháng" />
              <Option value="Quý" />
              <Option value="Năm" />
            </Select>

            {typeTime === "Tháng" ? (
              <>
                <Select label="" setValue={setTime} className="select-time">
                  {months.map((item, index) => {
                    return <Option key={index} value={item}></Option>;
                  })}
                </Select>
                <Select
                  label=""
                  setValue={handleChangeTime}
                  className="select-time"
                >
                  {years.map((item, index) => {
                    return <Option key={index} value={item}></Option>;
                  })}
                </Select>
              </>
            ) : typeTime === "Quý" ? (
              <>
                <Select label="" setValue={setTime} className="select-time">
                  {quarters.map((item, index) => {
                    return <Option key={index} value={item}></Option>;
                  })}
                </Select>
                <Select
                  label=""
                  setValue={handleChangeTime}
                  className="select-time"
                >
                  {years.map((item, index) => {
                    return <Option key={index} value={item}></Option>;
                  })}
                </Select>
              </>
            ) : typeTime === "Năm" ? (
              <Select
                label=""
                setValue={handleChangeTime}
                className="select-time"
              >
                {years.map((item, index) => {
                  return <Option key={index} value={item}></Option>;
                })}
              </Select>
            ) : null}
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
              <th>Thông số xe</th>
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
                        car.object === "Cá nhân"
                          ? setOpenUser(true)
                          : setOpenCompany(true);
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
                      value="THÔNG TIN CHỦ SỞ HỮU"
                      userData={selectedUser}
                    />
                    <Modalbox_company
                      triggerCompany={openCompany}
                      setTriggerCompany={setOpenCompany}
                      value="THÔNG TIN CHỦ SỞ HỮU"
                      userData={selectedUser}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setOpenCar(true);
                        setSelectedCar(car);
                      }}
                    >
                      Chi tiết
                    </button>
                    <Modalbox_carDetail
                      triggerCar={openCar}
                      setTriggerCar={setOpenCar}
                      value="THÔNG SỐ XE"
                      carData={selectedCar}
                    />
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
                      value="THÔNG TIN ĐĂNG KIỂM"
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
