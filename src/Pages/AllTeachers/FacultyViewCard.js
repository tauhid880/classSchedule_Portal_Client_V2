import React from "react";

const FacultyViewCard = ({ data }) => {
  const { name, email, facultyId, image, designation } = data;
  return (
    <div className="flex items-center w-full justify-center">
      <div className="max-w-xs">
        <div className="bg-[#b1aeae8c] shadow-xl rounded-lg py-3 w-[280px] lg:w-[300px] h-80">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyViewCard;
