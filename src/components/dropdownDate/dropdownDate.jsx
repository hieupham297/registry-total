import React from "react";
import { useEffect, useState } from "react";
import "./dropdownDate.css";

export const DropdownDate = () => {
  const times = [
    { id: "1", name: "Tháng" },
    { id: "2", name: "Quý" },
    { id: "3", name: "Năm" },
  ];

  const exactTimes = [
    { id: "1", timeId: "1", name: "Tháng 1" },
    { id: "2", timeId: "1", name: "Tháng 2" },
    { id: "3", timeId: "1", name: "Tháng 3" },
    { id: "4", timeId: "1", name: "Tháng 4" },
    { id: "5", timeId: "1", name: "Tháng 5" },
    { id: "6", timeId: "1", name: "Tháng 6" },
    { id: "7", timeId: "1", name: "Tháng 7" },
    { id: "8", timeId: "1", name: "Tháng 8" },
    { id: "9", timeId: "1", name: "Tháng 9" },
    { id: "10", timeId: "1", name: "Tháng 10" },
    { id: "11", timeId: "1", name: "Tháng 11" },
    { id: "12", timeId: "1", name: "Tháng 12" },
    { id: "13", timeId: "2", name: "Quý 1" },
    { id: "14", timeId: "2", name: "Quý 2" },
    { id: "15", timeId: "2", name: "Quý 3" },
    { id: "16", timeId: "2", name: "Quý 4" },
    { id: "17", timeId: "3", name: "2021" },
    { id: "18", timeId: "3", name: "2022" },
    { id: "19", timeId: "3", name: "2023" },
  ];

  const [time, setTime] = useState([]);
  const [exactTime, setExactTime] = useState([]);

  useEffect(() => {
    setTime(times);
  }, []);

  const handleTime = (id) => {
    const dt = exactTimes.filter((x) => x.timeId === id);
    setExactTime(dt);
  };

  return (
    <div className="dropdown-main">
      <select
        className="dropdown-control"
        id=""
        onChange={(e) => handleTime(e.target.value)}
      >
        <option value="0">Chọn...</option>
        {time && time !== undefined
          ? time.map((ctr, index) => {
              return (
                <option key={index} value={ctr.id}>
                  {ctr.name}
                </option>
              );
            })
          : "no time"}
      </select>

      <select className="dropdown-control" id="">
        <option value="0">Chọn...</option>
        {exactTime && exactTime !== undefined
          ? exactTime.map((ctr, index) => {
              return (
                <option key={index} value={ctr.id}>
                  {ctr.name}
                </option>
              );
            })
          : "no time"}
      </select>
    </div>
  );
};
