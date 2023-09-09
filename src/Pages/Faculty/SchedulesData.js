import React from "react";
import IndividualSchedulesData from "./IndividualSchedulesData";
import { Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const SchedulesData = ({ filteredSchedules }) => {
  return filteredSchedules.map((individualExcelData, index) => (
    <Tr className="divide-y divide-gray-500 mt-3" key={index}>
      <IndividualSchedulesData
        index={index}
        individualExcelData={individualExcelData}
      />
    </Tr>
  ));
};

export default SchedulesData;
