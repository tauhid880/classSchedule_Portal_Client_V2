import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { AuthContext } from "../../Contexts/AuthProvider";
import FacultyViewCard from "./FacultyViewCard";

const FacultyTeachers = () => {
  const { user } = useContext(AuthContext);
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const res = await fetch(
        ` https://schedule-app-server.vercel.app/allusers`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <>
      {isLoading && <Loading></Loading>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 md:gap-6 justify-items-center py-8 lg:p-16 items-center min-h-screen">
        {allUsers.map((data) => (
          <FacultyViewCard
            key={user._id}
            data={data}
            refetch={refetch}
          ></FacultyViewCard>
        ))}
      </div>
    </>
  );
};

export default FacultyTeachers;
