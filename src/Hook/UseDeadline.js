import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

export const UseDeadline = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const aa = dates.map((dd) => dd.date);
  const dd = aa[0];
  useEffect(() => {
    async function fetchDates() {
      try {
        const response = await axios.get(
          "https://schedule-app-server.vercel.app/dates"
        );
        setDates(response.data.dates);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    }

    fetchDates();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCreateDate = async () => {
    try {
      await axios.post("https://schedule-app-server.vercel.app/dates", {
        date: selectedDate,
      });
      // Refresh the list of dates
      const response = await axios.get(
        "https://schedule-app-server.vercel.app/dates"
      );
      setDates(response.data.dates);
      setSelectedDate(new Date());
    } catch (error) {
      console.error("Error creating date:", error);
    }
  };

  const handleUpdateDate = async () => {
    if (updateId) {
      try {
        await axios.patch(
          `https://schedule-app-server.vercel.app/dates/${updateId}`,
          {
            date: selectedDate,
          }
        );
        // Refresh the list of dates
        const response = await axios.get(
          "https://schedule-app-server.vercel.app/dates"
        );
        setDates(response.data.dates);
        setSelectedDate(new Date());
        setIsUpdating(false);
        setUpdateId(null);
        toast.success("Updated");
      } catch (error) {
        console.error("Error updating date:", error);
      }
    }
  };

  const handleEditDate = (dateId) => {
    const selected = dates.find((date) => date._id === dateId);
    setSelectedDate(new Date(selected.date));
    setIsUpdating(true);
    setUpdateId(dateId);
  };

  return [
    selectedDate,
    handleDateChange,
    isUpdating,
    handleUpdateDate,
    handleCreateDate,
    dates,
    handleEditDate,
    dd,
  ];
};

export default UseDeadline;
