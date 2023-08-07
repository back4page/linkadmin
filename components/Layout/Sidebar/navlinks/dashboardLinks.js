import {
  FaHome,
  FaEnvelope,
  FaUsers,
  FaImage,
  FaGlobe,
  FaQrcode,
} from "react-icons/fa";

export const dashboardLinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: <FaHome />,
  },
  {
    name: "Information",
    link: "/information",
    icon: <FaEnvelope />,
  },
  {
    name: "Collections",
    link: "/collections",
    icon: <FaEnvelope />,
  },
  {
    name: "Posters",
    link: "/posters",
    icon: <FaUsers />,
  },
  {
    name: "ID Card",
    link: "/id-card",
    icon: <FaImage />,
  },
  {
    name: "Links",
    link: "/links",
    icon: <FaGlobe />,
  },

  {
    name: "QR Code",
    link: "/qr-code",
    icon: <FaQrcode />,
  },
];
