import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddClass = ({ isDeadlinePasse }) => {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const fileInputRef = useRef(null);
  const [excelData, setExcelData] = useState(null);
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  // Fetch the deadline date from backend API
  useEffect(() => {
    axios
      .get("https://schedule-app-server.vercel.app/dates") // Replace with your API endpoint
      .then((response) => {
        const fetchedDeadlineDate = response.data.dates;
        const aa = fetchedDeadlineDate.map((dd) => dd.date);
        const dd = new Date(aa[0]);
        console.log(dd);
        setDeadlineDate(dd);
      })
      .catch((error) => {
        console.error("Error fetching deadline:", error);
      });
  }, []);

  // Check if the deadline date has passed
  useEffect(() => {
    if (deadlineDate) {
      const currentDate = new Date();
      setIsDeadlinePassed(currentDate > deadlineDate);
    }
  }, [deadlineDate]);

  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      //   console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      const newArray = data.map(({ __rowNum__, SL, ...rest }) => rest);

      //   Save excel data into database
      fetch("https://schedule-app-server.vercel.app/schedules", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newArray),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Data Save Successfully");
            fileInputRef.current.value = "";
          }
        });
    } else {
      setExcelData(null);
    }
  };

  return (
    <div className="h-screen flex flex-row justify-center items-center">
      {/* upload file section */}
      <div className="form px-2 lg:px-0 md:px-0">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label className="text-center text-xl font-semibold">
            <h5>Upload Excel file</h5>
          </label>
          <br></br>
          <div className="flex flex-col gap-2 justify-center items-center">
            <input
              ref={fileInputRef}
              type="file"
              className="form-control file-input file-input-bordered rounded-md w-full max-w-xs"
              onChange={handleFile}
              required
            ></input>
            {excelFileError && (
              <div className="text-red-600 font-semibold flex flex-row justify-center items-center">
                {excelFileError}
              </div>
            )}

            <button
              disabled={isDeadlinePassed}
              type="submit"
              className={`text-sm px-12 mt-3 py-2  border rounded-full  ${
                isDeadlinePassed
                  ? "bg-gray-500 text-white"
                  : "bg-red-400 hover:bg-red-500 text-white"
              }`}
            >
              {isDeadlinePassed ? "Disable" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
