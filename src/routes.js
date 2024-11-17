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
  RocketIcon,
} from "components/Icons/Icons";

import {
  InicioRolesIcon,
  InicioTablero,
  NosotrosIcon,
  ContactoIcon,
  GestionUsuarios,
  GestionCategorias,
  LoginIcon,
} from "components/Icons/Iconos";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: <InicioTablero />,
    component: Dashboard,
    layout: "/admin",
    isAdminOption: true,
  },
  {
    path: "/dashboard",
    name: "Inicio: Usuarios",
    icon: <InicioRolesIcon />,
    component: Dashboard,
    layout: "/user",
    isAdminOption: false,
  },
  {
    path: "/nosotros",
    name: "Nosotros",
    icon: <NosotrosIcon />,
    component: Nosotros,
    layout: "/user",
    isAdminOption: false,
  },
  {
    path: "/contacto",
    name: "Contacto",
    icon: <ContactoIcon />,
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
        name: "Gestión de Usuarios",
        rtlName: "لوحة القيادة",
        icon: <GestionUsuarios />,
        secondaryNavbar: true,
        component: UserAdmin,
        layout: "/admin",
      },
      {
        path: "/categorias",
        name: "Gestión de Categorías",
        rtlName: "لوحة القيادة",
        icon: <GestionCategorias />,
        secondaryNavbar: true,
        component: Categorias,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Inicio de Sesión",
        rtlName: "لوحة القيادة",
        icon: <LoginIcon />,
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
    ],
  },
];

export default dashRoutes;