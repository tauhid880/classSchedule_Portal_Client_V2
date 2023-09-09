import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import MessageCard from "./MessageCard";

const Messages = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch(
        `https://schedule-app-server.vercel.app/messages`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <>
      {isLoading && <Loading></Loading>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 md:gap-6 justify-items-center p-3.5 lg:p-10">
        {data.map((data) => (
          <MessageCard
            key={data._id}
            data={data}
            isLoading={isLoading}
            refetch={refetch}
          ></MessageCard>
        ))}
      </div>
    </>
  );
};

export default Messages;
