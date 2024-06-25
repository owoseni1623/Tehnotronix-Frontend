

function SearchBar({ newSearch, searchHandle }) {
    return (
      <input
        type="text"
        placeholder="Search products..."
        value={newSearch}
        onChange={searchHandle}
        className="border border-gray-500 rounded p-2 mb-4 w-[50%] text-center justify-center"
      />
    );
  }
  
  export default SearchBar;