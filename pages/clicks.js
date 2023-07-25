import { useSession } from "next-auth/react";
import { FaMousePointer } from "react-icons/fa";
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

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaMousePointer />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">Clicks</h1>
      </div>

      <Loader isLoading={isLoading}>
        <div className="mt-7 bg-white p-4 lg:p-8  rounded shadow-md">
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
