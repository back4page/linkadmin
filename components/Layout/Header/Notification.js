import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { notificationsData } from "./notificationsData";
import useToggle from "../../../hooks/useToggle";
import { io } from "socket.io-client";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const { toggle, setToggle, node } = useToggle();

  // const [test, setTest] = useState(0);

  const socket = io(process.env.NEXT_PUBLIC_API_URL, {
    transports: ["websocekt"],
  });

  socket.on("it will change", (data) => {
    console.log("socket", data);
    setNotifications([...notifications, data]);
  });

  useEffect(() => {
    const audio = new Audio("notification.mp3");
    audio.play();
  }, [notifications]);

  // useEffect(() => {
  //   const testint = setInterval(() => {
  //     setTest(test + 1);
  //   }, 5000);

  //   return () => clearInterval(testint);
  // }, [test]);

  return (
    <div ref={node} className="relative">
      <div className="cursor-pointer group" onClick={() => setToggle(!toggle)}>
        <div
          className={`p-2 group-hover:bg-gray-200 rounded-full ${
            toggle && "bg-gray-200"
          }`}
        >
          <FaRegBell
            className={`text-xl ${toggle ? "text-blue-700" : "text-red-500"}`}
          />
        </div>
        <div className="absolute -top-3 -right-2 bg-indigo-900 border-2 border-white text-sm text-white rounded-full p-[2px]  w-7 text-center  shadow-lg">
          {/* {notificationsData.length} */}
          {notifications.length}
        </div>
      </div>

      {toggle && (
        <div className="absolute w-[400px] font-light top-[52px] right-0 bg-white shadow-md overflow-hidden">
          <p className="px-1 py-4 bg-indigo-900 text-white transition duration-300 text-center cursor-default">
            Notifications
          </p>

          <div className="divide-y overflow-y-auto max-h-[340px]">
            {/* {notificationsData.map((notification) => (
              <div
                key={notification.id}
                className="px-7 py-5 space-y-2 hover:bg-slate-100 transition duration-300 cursor-pointer"
              >
                <h4 className="text-sm font-semibold ">{notification.name}</h4>
                <p className="text-xs font-light">{notification.time} ago</p>
              </div>
            ))} */}
            {notifications.length > 1 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-7 py-5 space-y-2 hover:bg-slate-100 transition duration-300 cursor-pointer"
                >
                  <p className="text-sm font-semibold ">{notification.name}</p>
                  <p className="text-xs font-light">{notification.time} ago</p>
                </div>
              ))
            ) : (
              <p className="py-5 text-sm text-center font-semibold">
                No new notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
