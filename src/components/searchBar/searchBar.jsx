import React, { useState } from "react";
import "./searchBar.css";
import { MagnifyingGlass } from "@phosphor-icons/react";

export const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="search-main">
      <form action="">
        <MagnifyingGlass />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Nhập biển số xe..."
        />
      </form>
    </div>
  );
};
