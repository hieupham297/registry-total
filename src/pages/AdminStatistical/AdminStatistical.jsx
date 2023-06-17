/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { SearchBar } from "../../components/searchBar/searchBar";
import { Option, Select } from "../../components/Select/Select";
import { Modalbox_carDetail } from "../../components/modalBox/modalBox_carDetail";
import { Modalbox_registry } from "../../components/modalBox/modalBox_registry";
import { Modalbox_userDetail } from "../../components/modalBox/modalBox_userDetail";
import { Modalbox_company } from "../../components/modalBox/modalBox_company";

export const AdminSatistical = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openCar, setOpenCar] = useState(false);
  const [openRegistry, setOpenRegistry] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  const [typeLocation, setTypeLocation] = useState("Cả nước");

  const [typeTime, setTypeTime] = useState("Chọn...");
  const [time, setTime] = useState("Tháng");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [search, setSearch] = useState("");

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
  const pages = 10;

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
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCar();
  }, []);

  // fetch data
  const fetchAllCar = () => {
    fetch(`http://localhost:5000/cdk/getAllCar`, {
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
  const fetchCarByRegion = (location) => {
    fetch(`http://localhost:5000/cdk/getCarByRegion/${location}`, {
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
  const fetchCarByCenter = (location) => {
    fetch(`http://localhost:5000/cdk/getCarByCenter/${location}`, {
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

  const fetchCarByQuater = (year) => {
    fetch(`http://localhost:5000/cdk/getCarByQuarterYear/${time}/${year}`, {
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

  const fetchCarByMonth = (year) => {
    fetch(`http://localhost:5000/cdk/getCarByMonthYear/${time}/${year}`, {
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

  // các hàm handle
  const handleSearch = (value) => {
    setSearch(value);
  };
  const handleChangeLocation = (value) => {
    if (typeLocation === "Khu vực") {
      fetchCarByRegion(value);
    } else if (typeLocation === "Trung tâm") {
      fetchCarByCenter(value);
    }
    // } else {
    //   fetchAllCar();
    //   console.log(value);
    // }
  };

  const handleCountry = (value) => {
    if (value === "Cả nước") {
      setTypeLocation("Cả nước");
      fetchAllCar();
    } else {
      setTypeLocation(value);
    }
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

  // các hàm xử lý số trang

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
                      value="Thông số xe"
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
