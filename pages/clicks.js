import { useSession } from "next-auth/react";
import {
  FaCalculator,
  FaHourglassEnd,
  FaMousePointer,
  FaUserAlt,
} from "react-icons/fa";
import Loader from "../components/common/Loader";
import Table from "../components/Table";
import { clicksColumn } from "../components/Table/columns/clicksColumn";
import useGetData from "../hooks/useGetData";

function ClicksPage() {
  const { data } = useSession();
  const id = data?.user?.id;
  const admin = data?.user?.admin;
  const adminId = data?.user?.adminId;
  const posterId = data?.user?.posterId;
  // console.log("poster session", id);

  const route = admin ? `/${adminId}` : `/${adminId}/${posterId}`;

  const { data: fetchedData, isLoading, isError } = useGetData(route);

  const clicksData = fetchedData?.data?.click;

  console.log("clicksData", clicksData);

  const cards = [
    {
      name: "Today Found",
      count: 10,
      color: "bg-[#E91F63]",
      icon: <FaUserAlt />,
    },
    {
      name: "Today Click",
      count: 10,
      color: "bg-[#8AC24B]",
      icon: <FaHourglassEnd />,
    },
    {
      name: "Total Found",
      count: 10,
      color: "bg-[#FE8519]",
      icon: <FaCalculator />,
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaMousePointer />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">Clicks</h1>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`h-[97px] w-full rounded-md overflow-hidden ${card.color}`}
          >
            <div className="flex h-full">
              <div className="h-full w-[96px] bg-black/30 text-white flex justify-center items-center text-[34px]">
                {card.icon}
              </div>

              <div className="py-2 px-3 text-white">
                <p className="uppercase font-semibold">{card.name}</p>
                <p className="font-bold text-xl">{card.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Loader isLoading={isLoading}>
        <div className="mt-10 bg-white p-4 lg:p-8  rounded shadow-md">
          <h4 className="text-xl font-semibold">Total Clicks</h4>
          {clicksData && (
            <Table columnsHeading={clicksColumn} usersData={clicksData} />
          )}
          {!clicksData && <p className="mt-10 text-lg">No Clicks</p>}
        </div>
      </Loader>
    </div>
  );
}

export default ClicksPage;
