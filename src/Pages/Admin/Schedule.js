import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Search from "../../components/Search";
import AdminSchedulesData from "./AdminSchedulesData";

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {
    data: schedules = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      const res = await fetch(
        `https://schedule-app-server.vercel.app/allschedules`
      );
      const data = await res.json();
      return data;
    },
  });

  // Delete functionality
  const deleteSchedule = async (id) => {
    const sure = window.confirm("Are you sure you want to delete?");

    if (!sure) {
      return;
    }

    try {
      const response = await fetch(
        `https://schedule-app-server.vercel.app/allschedules/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Schedule successfully deleted");
        refetch();
      } else {
        console.error(
          `Failed to delete schedule. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("An error occurred while deleting the schedule:", error);
      // Handle network or other unexpected errors.
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredSchedules = schedules.filter((schedule) => {
    // console.log(schedule);
    if (selectedCategory === "all") {
      return (
        schedule.Faculty_Name.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) || schedule.Subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return (
        (schedule.Semester === selectedCategory &&
          schedule.Faculty_Name.toLowerCase().includes(
            searchTerm.toLowerCase()
          )) ||
        (schedule.Semester === selectedCategory &&
          schedule.Subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  });

  return (
    <>
      {isLoading && <Loading></Loading>}
      <div className="p-5 lg:p-8 rounded-lg min-h-screen">
        {/* Search bar */}
        <Search
          handleSearchTermChange={handleSearchTermChange}
          handleCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        ></Search>
        {/* Search bar end */}
        <div className="">
          <Table className="table table-compact w-full relative">
            <Thead className="text-center normal-cas">
              <Tr>
                <Th className="normal-case text-sm">SL</Th>
                <Th className="normal-case text-sm">Faculty Name</Th>
                <Th className="normal-case text-sm">Semester</Th>
                <Th className="normal-case text-sm">Year</Th>
                <Th className="normal-case text-sm">Batch</Th>
                <Th className="normal-case text-sm">Room Number</Th>
                <Th className="normal-case text-sm">Subject</Th>
                <Th className="normal-case text-sm">Course Code</Th>
                <Th className="normal-case text-sm">Date</Th>
                <Th className="normal-case text-sm">Day</Th>
                <Th className="normal-case text-sm">Time</Th>
                <Th className="normal-case text-sm">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <AdminSchedulesData
                filteredSchedules={filteredSchedules}
                deleteSchedule={deleteSchedule}
              />
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Schedule;
