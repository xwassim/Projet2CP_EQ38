import { GiftIcon, HomeIcon, PencilIcon, TicketIcon} from "@heroicons/react/outline";

import {HiOutlineUserGroup} from "react-icons/hi"
import {TbMoodKid} from"react-icons/tb"
import {BsChatLeftText} from "react-icons/bs"
import {
  AppstoreOutlined,
  ShopOutlined,
  SkinOutlined,
  UserOutlined,
  CommentOutlined,
  SettingOutlined,
} from "@ant-design/icons";
export const InvestDB = [
  {
    id:0,
    title: "Nombre des parents",
    desc: "  ",
    price: " 20000 ",
    upOrDown: "up",
    percent: "",
    icon: <HiOutlineUserGroup className="h-5 w-5 invest-icon" />,
  },
  {
    id:1,
    title: "Nombre des propriétaires",
    desc: "",
    price: "16000",
    upOrDown: "down",
    percent: "",
    icon: <HiOutlineUserGroup className="h-5 w-5 invest-icon" />,
  },
  {
    id:2,
    title: "Nombre des enfants",
    desc: "",
    price: " 3500 ",
    upOrDown: "up",
    percent: "",
    icon: <TbMoodKid className=" h-5 w-5 invest-icon" />,


  },
  {
    id:3,
    title: "Nombre des commentaires",
    desc: "",
    price: "15000",
    upOrDown: "down",
    percent: "",
    icon: <BsChatLeftText className="h-5 w-5 invest-icon" />,
  },
];
