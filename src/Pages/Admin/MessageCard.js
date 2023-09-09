import React from "react";
import toast from "react-hot-toast";

const MessageCard = ({ data, refetch }) => {
  const { userName, userImage, userEmail, message, createdAt, _id } = data;

  // Delete functionality
  const deleteMessage = async (id) => {
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
  };
  return (
    <div className="">
      <article className="rounded-md bg-[#191825] lg:p-4 p-2 lg:w-[450px] min-w-full lg:h-[320px] h-[320px]">
        <div className="flex items-center gap-4">
          <img
            alt="Developer"
            src={userImage}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-medium text-white">{userName}</h3>
            <p className="text-sm font-medium text-gray-400 my-1">
              {userEmail}
            </p>
            <p className="text-sm font-medium text-gray-400 my-1">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          <li>
            <strong className="font-medium text-white">Message</strong>

            <p className="h-[110px]  scrollbar-thumb-slate-100 scrollbar-track-[#A09B9D] scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-thin mt-1 text-xs font-medium text-gray-200 rounded-md border border-gray-700 p-2 hover:border-pink-600">
              {message}
            </p>
          </li>
        </ul>
        <div className="flex justify-center">
          <button
            onClick={() => deleteMessage(_id)}
            className="bg-buttonDelete w-2/4 mt-4 lg:mt-4 px-3 py-1 text-slate-50 font-normal hover:bg-[#FF6464] transition ease-in-out hover:-translate-2 hover:scale-110 duration-300"
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  );
};

export default MessageCard;
