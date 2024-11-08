// Importación de componentes
import Dashboard from "views/Dashboard/Dashboard";
import Nosotros from "views/Nosotros/Nosotros";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",

    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    isAdminOption: true, // Ocultar para usuarios en /user
  },
  {
    path: "/dashboard",
    name: "Inicio Usuarios",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/user",
    isAdminOption: false, // Mostrar para usuarios en /user
  },
  {
    path: "/nosotros",
    name: "Nosotros",
    icon: <PersonIcon color="inherit" />,
    component: Nosotros,
    layout: "/user",
    isAdminOption: false, // Siempre visible

  },
  {
    path: "/billing",
    name: "Billing",

    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
    isAdminOption: false, // Siempre visible
  },
  {

    state: "pageCollapse",
    isAdminOption: true, // Ocultar para usuarios en /user
    views: [
      {
        path: "/profile",
        name: "Profile",

        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",

        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",

        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];

export default dashRoutes;

