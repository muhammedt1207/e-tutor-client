import React from "react";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const SearchBar = ({ handleSearch, search, setSearch, placeholder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };

  return (
    <div className="w-full">
      <form
        className="flex items-center bg-white py-2 shadow px-4 rounded-lg border-orange-500 hover:py-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="outline-none py-2 rounded w-full placeholder:text-xl text-orange-500"
          placeholder={placeholder || "Search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search ? (
          <button
            type="button"
            className="bg-black py-3 px-8 rounded-md"
            onClick={handleClear}
          >
            <GrClose className="text-2xl text-gray-400 hover:text-gray-800" />
          </button>
        ) : (
          <button type="submit">
            <BiSearch className="text-2xl text-orange-500 hover:text-gray-800" />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
