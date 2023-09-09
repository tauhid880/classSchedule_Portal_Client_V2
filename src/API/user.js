export const dbUser = async (user) => {
  const res = await fetch("https://schedule-app-server.vercel.app/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return data;
};
