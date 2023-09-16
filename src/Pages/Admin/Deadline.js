import React from "react";
import DatePicker from "react-datepicker";
import { HiOutlinePencil } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import UseDeadline from "../../Hook/UseDeadline";
const Deadline = () => {
  const [
    selectedDate,
    handleDateChange,
    isUpdating,
    handleUpdateDate,
    handleCreateDate,
    dates,
    handleEditDate,
  ] = UseDeadline();

  return (
    <div className="flex flex-col justify-center items-center relative top-1/3 ml-10 lg:ml-0 lg:top-">
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
        <DatePicker
          withPortal
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          selected={selectedDate}
          className="border p-2 mr-5  focus:outline-red-400"
          placeholderText="Click to select a date"
          minDate={new Date()}
          onChange={handleDateChange}
        />
        {isUpdating ? (
          <button
            className="bg-buttonDelete text-white w-32 mt-5 lg:mt-0 lg:px-3.5 text-sm py-2 rounded-full hover:bg-primary "
            onClick={handleUpdateDate}
          >
            Update Date
          </button>
        ) : (
          <></>
        )}
        <ul>
          {dates.map((date) => (
            <li className=" mt-5 lg:mt-0 lg:ml-10 flex" key={date._id}>
              <div className="">
                Deadline is : {new Date(date.date).toLocaleDateString()}
              </div>
              <button className="ml-3" onClick={() => handleEditDate(date._id)}>
                <HiOutlinePencil />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Deadline;
