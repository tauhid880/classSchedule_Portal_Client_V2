import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider";
import Moment from "react-moment";
import "moment-timezone";

const IndividualMessagesCard = ({ data, refetch }) => {
  const { userName, userImage, userEmail, message, createdAt, _id } = data;
  const { user } = useContext(AuthContext);

  // Delete functionality
  const deleteMessage = async (id) => {
    if (user?.email === userEmail) {
      const sure = window.confirm("Are you sure you want to delete?");

      if (!sure) {
        return;
      }

      try {
        const response = await fetch(
          `https://schedule-app-server.vercel.app/messages/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Message successfully deleted");
          refetch();
        } else {
          console.error(
            `Failed to delete message. Status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error("An error occurred while deleting the message:", error);
        // Handle network or other unexpected errors.
      }
    }
  };
  return (
    <div className="">
      <article className="rounded-md bg-[#191825] lg:p-4 p-4 lg:w-[450px] w-72 min-w-full lg:h-[320px] h-[320px]">
        <div className="flex items-center gap-4">
          <img
            alt="Developer"
            src={userImage}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h3 className="lg:text-lg text-base tracking-tight font-medium text-white">
              {userName}
            </h3>
            <p className="text-sm font-medium text-gray-400 my-1">
              {userEmail}
            </p>
            <p className="text-sm font-medium text-gray-400 my-1">
              <Moment local="de" format="D MMM YYYY">
                {createdAt}
              </Moment>
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          <li>
            <div className="mb-2">
              <strong className="font-medium text-white">Message</strong>
            </div>

            <p className="h-[110px]  scrollbar-thumb-slate-100 scrollbar-track-[#A09B9D] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-thin mt-1 text-lg font-medium text-gray-200 rounded-md border border-gray-700 p-2 hover:border-pink-600">
              {message}
            </p>
          </li>
        </ul>
        {user?.email === userEmail && (
          <div className="flex justify-center">
            <button
              onClick={() => deleteMessage(_id)}
              className="bg-primary rounded-full w-1/3 mt-5 lg:mt-4 px-3 py-1 text-slate-50 font-normal hover:bg-[#FF6464] transition ease-in-out hover:-translate-2 hover:scale-110 duration-300"
            >
              Delete
            </button>
          </div>
        )}
      </article>
    </div>
  );
};

export default IndividualMessagesCard;
