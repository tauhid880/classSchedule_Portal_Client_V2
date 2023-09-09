import React from "react";
import toast from "react-hot-toast";

const AllTeachersCard = ({ data, refetch, role }) => {
  // Delete functionality
  const deleteMessage = async (id) => {
    const sure = window.confirm("Are you sure you want to delete?");

    if (!sure) {
      return;
    }

    try {
      const response = await fetch(
        `https://schedule-app-server.vercel.app/allusers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        refetch();
        toast.success("User successfully deleted");
      } else {
        console.error(`Failed to delete user. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred while deleting the message:", error);
      // Handle network or other unexpected errors.
    }
  };
  const { name, email, facultyId, image, designation, _id } = data;
  return (
    <div class="flex items-center w-full justify-center">
      <div class="max-w-xs">
        <div class="bg-[#b1aeae8c] shadow-xl rounded-lg py-3 w-[280px] lg:w-[300px] h-96">
          <div class="photo-wrapper p-2">
            <img
              class="w-32 h-32 rounded-full mx-auto"
              src={image}
              alt="John Doe"
            />
          </div>
          <div class="p-2">
            <h3 class="text-center text-xl  text-gray-900 font-medium leading-6">
              {name}
            </h3>
            <div class="text-center text-gray-700 text-xs font-bold">
              <p>{designation}</p>
            </div>
            <table class="text-xs my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">{email}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">
                    Faculty ID
                  </td>
                  <td class="px-2 py-2">{facultyId}</td>
                </tr>
              </tbody>
            </table>

            <div class="text-center my-3">
              {role ? (
                <button
                  onClick={() => deleteMessage(_id)}
                  class="text-xs bg-buttonDelete w-1/3 mt-4 lg:mt-4 px-2 py-1 text-slate-50 hover:bg-[#FF6464] transition ease-in-out hover:-translate-2 hover:scale-110 duration-300  italic hover:underline hover:text-black font-medium"
                  href="#"
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTeachersCard;
