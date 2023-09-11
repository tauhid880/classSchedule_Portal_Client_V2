import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { toast } from "react-hot-toast";

const AddMessage = () => {
  const { user } = useContext(AuthContext);
  const handleMessage = (e) => {
    e.preventDefault();
    const form = e.target;
    const createdAt = new Date();
    const message = form.message.value;
    const messages = {
      userName: user?.displayName,
      userImage: user?.photoURL,
      userEmail: user?.email,
      message,
      createdAt,
    };

    // save messages post information in database
    fetch("https://schedule-app-server.vercel.app/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(messages),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully Message added");
          form.reset();
        }
      });
  };
  return (
    <section className="px-3 h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleMessage}>
        <h1 className="text-2xl text-center font-semibold">Message</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="form-control rounded-xl shadow-xl lg:w-full p-10 grid grid-cols-1 content-center justify-items-center gap-3 bg-[#191825d2]  my-5 border-t-[#FF9F9F] border-t-4">
            <div className="flex flex-col gap-4 justify-center items-center ">
              <textarea
                type="text"
                name="message"
                required
                className="textarea textarea-bordered lg:h-72 h-40 w-[250px] md:w-[350px] lg:w-96"
                placeholder="Type your message within 300 word"
              ></textarea>

              <button className="bg-primary rounded-full w-36 lg:w-1/3 mt-4 lg:mt-4 px-3 py-1 text-gray-900 font-normal hover:text-white hover:bg-[#bb2525b5] transition ease-in-out hover:-translate-2 hover:scale-110 duration-300">
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddMessage;
