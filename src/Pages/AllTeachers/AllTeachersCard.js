import React from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const AllTeachersCard = ({ data, refetch, role }) => {
  const { name, email, facultyId, image, designation, _id } = data;
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

  return (
    <div className="flex items-center w-full justify-center">
      <div className="max-w-xs">
        <div className="bg-[#b1aeae8c] shadow-xl rounded-lg py-3 w-[280px] lg:w-[300px] h-96">
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={image}
              alt="John Doe"
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl  text-gray-900 font-medium leading-6">
              {name}
            </h3>
            <div className="text-center text-gray-700 text-xs font-bold">
              <p>{designation}</p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Email
                  </td>
                  <td className="px-2 py-2">{email}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Faculty ID
                  </td>
                  <td className="px-2 py-2">{facultyId}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center my-3">
              {role ? (
                <button
                  onClick={() => deleteMessage(_id)}
                  className="text-xs bg-button w-1/3 mt-4 lg:mt-4 px-2 py-1 rounded-full text-slate-900 hover:bg-[#FF6464] transition ease-in-out hover:-translate-2 hover:scale-110 duration-300 hover:text-black font-medium"
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
