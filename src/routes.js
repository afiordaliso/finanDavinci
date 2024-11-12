// Importación de componentes
import Dashboard from "views/Dashboard/Dashboard";
import Nosotros from "views/Nosotros/Nosotros";
import Contacto from "views/Contacto/Contacto";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import UserAdmin from "views/Usuarios/Usuarios";
import Categorias from "views/Categorias/Categorias";

import {
  HomeIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    isAdminOption: true,
  },
  {
    path: "/dashboard",
    name: "Inicio Usuarios",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/user",
    isAdminOption: false,
  },
  {
    path: "/nosotros",
    name: "Nosotros",
    icon: <PersonIcon color="inherit" />,
    component: Nosotros,
    layout: "/user",
    isAdminOption: false,
  },
  {
    path: "/contacto",
    name: "Contacto",
    icon: <DocumentIcon color="inherit" />,
    component: Contacto,
    layout: "/user",
    isAdminOption: false,
  },
  {
    name: "Administración",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    isAdminOption: true,
    views: [
      {
        path: "/usuarios",
        name: "Usuarios",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: UserAdmin,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Inicio de Sesión",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Registrarse",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/categorias",
        name: "Categorias",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: Categorias,
        layout: "/admin",
      },
    ],
  },
];

export default dashRoutes;
