import Cards from "../components/Cards";
import { FaHome } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Marquee from "react-fast-marquee";
// import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";

export default function Home() {
  // const [showAd, setShowAd] = useState(false);

  const { data: session } = useSession();
  const { adminId } = session ? session.user : "";
  // const qrCodeStatus = data?.user?.qrCodeStatus;

  const { data: fetchedData, isLoading } = useGetData(
    `/qrcode/status/check/${adminId}`
  );

  console.log("ad", fetchedData);

  // useEffect(() => {
  //   // qrCodeStatus === true && setShowAd(true);
  //   fetchedData.status !== true && setShowAd(true);
  // }, []);

  return (
    <div className="">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaHome />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">Dashboard</h1>
      </div>
      <a href="https://www.back4page.com" target="_blank" rel="noreferrer">
        <div className="mt-7 bg-cyan-700 px-5 py-3 text-white font-semibold">
          <Marquee gradient={false} speed={150}>
            <span className="mr-20 md:mr-0">
              Need more traffic? visit back4page.com
            </span>
          </Marquee>
        </div>
      </a>

      {session && fetchedData?.data?.status !== true && !isLoading && (
        <div className="mt-2 bg-red-700 px-5 py-3 text-white font-semibold">
          <Marquee gradient={false} speed={130}>
            <span className="mr-20 md:mr-0">
              A new feature QR Code Generator is added. Please contact with
              admin to activate.
            </span>
          </Marquee>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8 mt-7 md:grid-cols-2 ">
        <Cards />
      </div>
    </div>
  );
}
