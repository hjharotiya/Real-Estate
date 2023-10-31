import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className=" flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          {/* ***************** type  **************  */}

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          {/* ***************** amenities **************  */}

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="border rounded-lg p-3">
            <label className="font-semibold">Sort :</label>
            <select name="" id="sort_order">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 uppercase text-white rounded-lg p-2 hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="font-semibold text-3xl border-b p-3 mt-5">
          Listing Results:
        </h1>
      </div>
    </div>
  );
}
