import React from "react";

const Search = ({
  handleSearchTermChange,
  handleCategoryChange,
  searchTerm,
  selectedCategory,
}) => {
  return (
    <div className="flex justify-center items-center mb-10">
      <div className="lg:w-full max-w-lg">
        <div className="flex items-center border-b-2 border-primary py-2">
          <input
            className="appearance-none cursor-text bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search with faculty name or subject"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <select
            className="bg-transparent border-none cursor-pointer text-gray-700 mr-3 py-1 px-1 leading-tight focus:outline-none"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="Fall">Fall</option>
            <option value="Summer">Summer</option>
            <option value="Spring">Spring</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
