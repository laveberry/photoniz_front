import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import MyPage from "views/MyPage";
import Join from "views/Join";
import Login from "views/Login";
import Developer from "views/Developer";
import Photo from "views/Photo.js";
import PhotoWriter from "components/Table/PhotoWriter";
import PhotoDetail from "components/Table/PhotoDetail";

//url 전체 루트 등록
var dashRoutes = [
  { path: "/dashboard", component: Dashboard, layout: "/photoniz"},
  { path: "/icons", component: Icons, layout: "/photoniz"},
  { path: "/maps", component: Maps, layout: "/photoniz"},
  { path: "/notifications", component: Notifications, layout: "/photoniz"},
  { path: "/user-page", component: UserPage, layout: "/photoniz"},
  { path: "/extended-tables", component: TableList, layout: "/photoniz"},
  { path: "/typography", component: Typography, layout: "/photoniz"},
  { path: "/mypage", component: MyPage, layout: "/photoniz" },
  { path: "/join", component: Join, layout: "/photoniz"},  
  { path: "/login", component: Login, layout: "/photoniz"},
  { path: "/upgrade", component: Upgrade, layout: "/photoniz" },  
  { path: "/developer", component: Developer, layout: "/photoniz"},
  { path: "/photo", component: Photo, layout: "/photoniz"},
  { path: "/photoWriter", component: PhotoWriter, layout: "/photoniz"},
  { path: "/photoDetail/:idx", component: PhotoDetail, layout: "/photoniz"}

];
export default dashRoutes;
