const imageHostKey = process.env.REACT_APP_imgbb_key;
export const imageUpload = async (formData) => {
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data;
};
