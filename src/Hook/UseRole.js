import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const useRole = (email) => {
  const [role, setRole] = useState("");
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://schedule-app-server.vercel.app/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data[0]?.role);
          setIsRoleLoading(false);
          setRole(data[0]?.role);
          // console.log(data[0].role);
        })
        .catch((error) => {
          setIsRoleLoading(false);
        });
    }
  }, [email]);
  return [role, isRoleLoading];
};

export default useRole;
