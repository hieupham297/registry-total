import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SearchBar } from "../../components/searchBar/searchBar";
import Button from "../../components/Button/Button";
import "./AllCar.css";
import { Modalbox_carDetail } from "../../components/modalBox/modalBox_carDetail";
import { Modalbox_registry } from "../../components/modalBox/modalBox_registry";
import { Modalbox_userDetail } from "../../components/modalBox/modalBox_userDetail";
import { FileArrowUp } from "@phosphor-icons/react";


export const AllCar = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openCar, setOpenCar] = useState(false);
  const [openRegistry, setOpenRegistry] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [carData, setCarData] = useState([]);
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const inputFile = document.getElementById('file')
    let fileNameField = document.getElementById('file-name')
    inputFile.addEventListener('change', function(event) {
    fileNameField.textContent += "Đã tải lên " + this.files.length + " file";
    
    })
  })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      console.log(storedUser.code);
      fetchData(storedUser.code);
    }
  }, []);

  const fetchData = (ttdk) => {
    fetch(`http://localhost:5000/cdk/getAllCenter/${ttdk}`, {
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
        setCarData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      // Điền vào đây
      // Điền vào đây
      // Điền vào đây
  };

  const processPages = (userList) => {
    const newList = userList.reduce((acc, cur, i) => {
      const index = Math.floor(i / 10);
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

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:5000/ttdk/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div className="statistical-cover">
      <div className="statistical-main">
        <div className="headbar">
          <SearchBar />
          <div className="upload">
            <div className="upload-file-wrap">
              <input
                className="upload-input"
                name="file"
                type="file"
                id="file"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
                data-multiple-caption="{count} files selected"
              />
              <label for="file" className="upload-custom">Chọn tệp tin <FileArrowUp /></label>
              <span id="file-name"></span>
            </div>
            <Button onClick={uploadFile}>
              Tải file
            </Button>
          </div>
        </div>
        <table>
          <tr>
            <th className="number_on_table">STT</th>
            <th>Loại phương tiện</th>
            <th>Nhãn hiệu</th>
            <th>Số khung</th>
            <th>Số máy</th>
            <th>Chủ sở hữu</th>
            <th>Thông số xe</th>
            <th>Thông tin đăng kiểm</th>
          </tr>
          <tr>
            <td className="number_on_table">1</td>
            <td>Ô tô con</td>
            <td>Toyota</td>
            <td>2HNYD28898H-545659</td>
            <td>J37A1-3062377</td>
            <td>
              <button className="userclick" onClick={() => setOpenUser(true)}>
                Nguyễn Thị Hà
              </button>
              <Modalbox_userDetail
                triggerUser={openUser}
                setTriggerUser={setOpenUser}
                value="Thông tin chủ sở hữu"
              />
            </td>
            <td>
              <button onClick={() => setOpenCar(true)}>Chi tiết</button>
              <Modalbox_carDetail
                triggerCar={openCar}
                setTriggerCar={setOpenCar}
                value="Thông số xe"
              />
            </td>
            <td>
              <button onClick={() => setOpenRegistry(true)}>Chi tiết</button>
              <Modalbox_registry
                triggerRegistry={openRegistry}
                setTriggerRegistry={setOpenRegistry}
                value="Thông tin đăng kiểm"
              />
            </td>
          </tr>
          {carData &&
            carData.map((car, index) => (
              <tr key={index}>
                <td></td>
                <td>{index + 1}</td>
                <td>{car.type}</td>
                <td>{car.mark}</td>
                <td>{car.chassisNumber}</td>
                <td>{car.engineNumber}</td>
                <td>{car.ownerName}</td>
                <td>{car.licenseDate}</td>
                <td>
                  <NavLink to>Chi tiết</NavLink>
                </td>
              </tr>
            ))}
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
