import React from "react";
import { Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import AdminSchedules from "./AdminSchedules";

const AdminSchedulesData = ({ filteredSchedules, deleteSchedule }) => {
  return filteredSchedules.map((individualExcelData, index) => (
    <Tr className="divide-y divide-gray-500 mt-3" key={index}>
      <AdminSchedules
        index={index}
        individualExcelData={individualExcelData}
        deleteSchedule={deleteSchedule}
      />
    </Tr>
  ));
};

export default AdminSchedulesData;
