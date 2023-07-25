import { useSession } from "next-auth/react";
import { FaGlobe } from "react-icons/fa";
import Loader from "../components/common/Loader";
import AdminLinks from "../components/Links/AdminLinks";
import PosterLinks from "../components/Links/PosterLinks";
import Table from "../components/Table";
import { linkColumn } from "../components/Table/columns/linkColumn";
// import { linkData } from "../data/linkData";
import useGetData from "../hooks/useGetData";

function LinksPage() {
  const { data: session } = useSession();
  const { id, admin } = session ? session.user : "";
  console.log("id", id);

  const { data: fetchedData, isLoading } = useGetData(
    `/link/get/${id}/${admin}`
  );
  console.log("links", fetchedData);

  const allSites = fetchedData?.data?.sites;
  const activeSites = fetchedData?.data?.data;

  // const x = allSites?.map((site) => site.name);
  // const y = activeSites?.map((site) => site);

  // const status = () => {
  //   const check = x?.map((site) => {
  //     if (y.includes(site)) {
  //       return "active";
  //     } else {
  //       return "inactive";
  //     }
  //   });
  //   return check;
  // };

  // console.log(status());

  const linksData = allSites?.map((site) => {
    const checkStatus = () => {
      if (activeSites?.includes(site.name)) {
        return "Active";
      } else {
        return "Inactive";
      }
    };

    return {
      site: site.name,
      status: checkStatus(),
    };
  });

  // const checkStatus = (site) => {
  //   if (activeSites?.includes(site.name)) {
  //     return "Active";
  //   } else {
  //     return "Inactive";
  //   }
  // };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaGlobe />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">Links</h1>
      </div>

      {admin ? (
        <AdminLinks id={id} admin={admin && 1} />
      ) : (
        <PosterLinks id={id} admin={!admin && 0} />
      )}
    </div>

    // <div className="relative">
    //   <div className="flex items-center gap-3">
    //     <span className="text-[28px] text-custom-blue2">
    //       <FaGlobe />
    //     </span>
    //     <h1 className="text-2xl font-bold text-custom-gray2">Link</h1>
    //   </div>

    //   <Loader isLoading={isLoading}>
    //     <div className="mt-7 bg-white p-8 rounded shadow-md">
    //       <h4 className="text-xl font-semibold">All Links</h4>
    //       {linksData && (
    //         <Table columnsHeading={linkColumn} usersData={linksData} />
    //       )}
    //       {/* <div className="mt-4 divide-y">
    //             {allSites?.map((site, i) => (
    //               <div key={i} className="grid grid-cols-2 items-center gap-10">
    //                 <p className="py-3 text-sm font-semibold text-custom-gray3">
    //                   {site.name}
    //                 </p>
    //               </div>
    //             ))}
    //           </div> */}
    //     </div>

    //     {/* <div className="flex-1">
    //         <div className="bg-white p-8 rounded shadow-md">
    //           <h4 className="text-xl font-semibold">Your Links</h4>
    //           <div className="mt-4 divide-y">
    //             {activeSites?.map((site, i) => (
    //               <p
    //                 key={i}
    //                 className="py-3 text-sm font-semibold text-custom-gray3"
    //               >
    //                 {site}
    //               </p>
    //             ))}
    //           </div>
    //         </div>
    //       </div> */}
    //   </Loader>
    // </div>
  );
}

export default LinksPage;
