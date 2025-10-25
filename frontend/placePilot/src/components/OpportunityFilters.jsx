import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";  // ✅ Correct slice

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-100 bg-white text-black p-3 rounded">
      <h1 className="fw-bold fs-5">Filter Jobs</h1>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-3">
          <h5 className="fw-bold">{data.filterType}</h5>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div className="form-check my-2" key={itemId}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={data.filterType}
                  id={itemId}
                  value={item}
                  checked={selectedValue === item}
                  onChange={changeHandler}
                />
                <label className="form-check-label" htmlFor={itemId}>
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;