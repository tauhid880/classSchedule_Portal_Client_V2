import React from "react";
import { Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const AdminSchedules = ({ individualExcelData, index, deleteSchedule }) => {
  const excelDateValue = individualExcelData.Date;
  const date = new Date((excelDateValue - 25569) * 86400 * 1000);
  // const formattedDate = date.toISOString().split("T")[0];
  const formattedDate =
    date.getDate().toString().padStart(2, "0") +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getFullYear();

  return (
    <>
      <Th className="text-center whitespace-nowrap">{index + 1}</Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Faculty_Name}
      </Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Semester}
      </Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Year}
      </Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Batch}
      </Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Room_Number}
      </Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Subject}
      </Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Course_Code}
      </Th>
      <Th className="text-center whitespace-nowrap">{formattedDate}</Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Day}
      </Th>
      <Th className="text-center whitespace-nowrap">
        {individualExcelData.Time}
      </Th>
      <Th className="text-center whitespace-nowrap">
        <button
          onClick={() => deleteSchedule(individualExcelData._id)}
          className="bg-buttonDelete w-full px-4 py-1.5 text-slate-50 font-normal hover:bg-[#FF6464] transition ease-in-out hover:-translate-2 hover:scale-110 duration-300"
        >
          Delete
        </button>
      </Th>
    </>
  );
};

export default AdminSchedules;
