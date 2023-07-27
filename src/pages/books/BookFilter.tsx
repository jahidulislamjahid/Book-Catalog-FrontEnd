import { Link } from "react-router-dom";
import { options } from "../../components/BookOptions";

const BookFilter = ({
  setSelectedGenre,
  setSearchText,
  searchText,
  selectedGenre,
  setSelectedYear,
  selectedYear,
  value,
  handleRangeChange,
}: any) => {
  return (
    <div className="p-5">
      <div>
        <h1 className="text-2xl uppercase text-curiousCyan my-3">Price Range</h1>
        <input
          type="range"
          defaultValue={50}
          max={400}
          min={0}
          step={1}
          onChange={handleRangeChange}
          className="range range-secondary"
        />
        <h1 className="font-bold mb-2 text-gray-700 ">From 0$ To {value}$</h1>
      </div>

      <input
        type="text"
        className="input input-bordered input-primary w-full max-w-xs mb-3"
        placeholder="Search by title, author, or genre"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <select
        className="select select-info w-full max-w-xs mb-5"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="nonfiction">Non-fiction</option>
        <option value="humor">Humor</option>
        <option value="memoir">Memoir</option>
        <option value="fantasy">Fantasy</option>
        <option value="horror">Horror</option>
        <option value="nystery">Mystery & Thriller</option>
        <option value="historical">Historical Fiction</option>
        <option value="science-fiction">Science-Fiction</option>
        <option value="motivational">Motivational</option>
        <option value="mystery">Mystery</option>
        <option value="self-development">Self-Development</option>
        <option value="novels">Novels</option>
      </select>

      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Publication Year</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Link
        to="/add-new-book"
      >
        <button
          className="btn bg-curiousCyan hover:bg-gray-900 text-white rounded-md w-full my-5"
        >
          Add New Books
        </button>
      </Link>
    </div>
  );
};

export default BookFilter;
