import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import UserPage from "views/UserPage.js";
import Developer from "views/Developer";
import Photo from "views/Photo.js";

// 사이드바 루트
var Root = [
  {
    path: "/dashboard",
    name: "Main",
    icon: "design_app",
    component: Dashboard,
    layout: "/photoniz"
  },
  {
    path: "/developer",
    name: "개발자",
    icon: "location_map-big",
    component: Developer,
    layout: "/photoniz"
  },
  {
    path: "/icons",
    name: "테마",
    icon: "design_image",
    component: Icons,
    layout: "/photoniz"
  },
  {
    path: "/maps",
    name: "모델",
    icon: "location_map-big",
    component: Maps,
    layout: "/photoniz"
  },
  {
    path: "/photo",
    name: "사진",
    icon: "design_image",
    component: Photo,
    layout: "/photoniz"
  },
  {
    path: "/notifications",
    name: "참조",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/photoniz"
  },
  {
    path: "/user-page",
    name: "편집",
    icon: "users_single-02",
    component: UserPage,
    layout: "/photoniz"
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: TableList,
    layout: "/photoniz"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/photoniz"
  }

];
export default Root;
