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
import Writer from "components/Writer/Writer";

//url 전체 루트 등록
var dashRoutes = [
  { path: "/dashboard", component: Dashboard, layout: "/admin"},
  { path: "/icons", component: Icons, layout: "/admin"},
  { path: "/maps", component: Maps, layout: "/admin"},
  { path: "/notifications", component: Notifications, layout: "/admin"},
  { path: "/user-page", component: UserPage, layout: "/admin"},
  { path: "/extended-tables", component: TableList, layout: "/admin"},
  { path: "/typography", component: Typography, layout: "/admin"},
  { path: "/mypage", component: MyPage, layout: "/admin" },
  { path: "/join", component: Join, layout: "/admin"},  
  { path: "/login", component: Login, layout: "/admin"},
  { path: "/upgrade", component: Upgrade, layout: "/admin" },  
  { path: "/developer", component: Developer, layout: "/admin"},
  { path: "/photo", component: Photo, layout: "/admin"},
  { path: "/writer", component: Writer, layout: "/admin"}

];
export default dashRoutes;
