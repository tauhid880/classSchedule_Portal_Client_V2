import React from "react";
import { Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const IndividualSchedulesData = ({ individualExcelData, index }) => {
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
    </>
  );
};

export default IndividualSchedulesData;
