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

//url 루트 등록
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Main",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "테마",
    icon: "design_image",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "모델",
    icon: "location_map-big",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "편집",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/admin"
  },
  // 기타루트
  {
    path: "/mypage",
    name: "마이페이지",
    component: MyPage,
    layout: "/admin"
  },
  {
    path: "/join",
    name: "회원가입",
    component: Join,
    layout: "/admin"
  },  
  {
    path: "/login",
    name: "로그인",
    component: Login,
    layout: "/admin"
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "objects_spaceship",
    component: Upgrade,
    layout: "/admin"
  },  
  {
    path: "/developer",
    name: "개발자",
    component: Developer,
    layout: "/admin"
  },
  {
    path: "/photo",
    name: "사진",
    component: Photo,
    layout: "/admin"
  }

];
export default dashRoutes;
