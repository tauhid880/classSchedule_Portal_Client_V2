import React from "react";
const ProfileCard = ({ user }) => {
  const { name, email, facultyId, image, designation } = user;
  return (
    <div class="flex items-center w-full justify-center">
      <div class="max-w-xs">
        <div class="bg-[#b1aeae8c] shadow-xl rounded-lg py-3 w-[280px] lg:w-[300px] h-80">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
