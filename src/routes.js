import React from "react";
import Dashboard from "views/Dashboard/Dashboard";
import Nosotros from "views/Nosotros/Nosotros";
import Contacto from "views/Contacto/Contacto";
import UserAdmin from "views/Usuarios/Usuarios";
import Categorias from "views/Categorias/Categorias";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import { Redirect } from "react-router-dom";

import { 
  InicioTablero,
  NosotrosIcon,
  ContactoIcon,
  GestionUsuarios,
  GestionCategorias,
  LogoutIcon,
} from "components/Icons/Iconos";

// Verifica el rol almacenado en el localStorage
const role = localStorage.getItem("role") || "";

// Define las rutas de administrador solo si el rol es "1" (admin)
const adminRoutes = role === "1" ? [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: <InicioTablero />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    name: "Administración",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/usuarios",
        name: "Gestión de Usuarios",
        icon: <GestionUsuarios />,
        component: UserAdmin,
        layout: "/admin",
      },
      {
        path: "/categorias",
        name: "Gestión de Categorías",
        icon: <GestionCategorias />,
        component: Categorias,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/logout",
    name: "Cerrar Sesión",
    icon: <LogoutIcon />,
    component: () => {
      localStorage.removeItem("token");
      localStorage.clear();
      return <Redirect to="/auth/signin" />;
    },
    layout: "/admin",
  },
] : [];

// Define las rutas de usuario si el rol es "2"
const userRoutes = role === "2" ? [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: <InicioTablero />,
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/nosotros",
    name: "Nosotros",
    icon: <NosotrosIcon />,
    component: Nosotros,
    layout: "/user",
  },
  {
    path: "/contacto",
    name: "Contacto",
    icon: <ContactoIcon />,
    component: Contacto,
    layout: "/user",
  },
  {
    path: "/logout",
    name: "Cerrar Sesión",
    icon: <LogoutIcon />,
    component: () => {
      localStorage.removeItem("token");
      localStorage.clear();
      return <Redirect to="/auth/signin" />;
    },
    layout: "/user",
  },
] : [];

// Rutas comunes para todos los roles
const commonRoutes = [
  {
    path: "/signin",
    component: SignIn,
    layout: "/auth",
  },
  {
    path: "/signup",
    component: SignUp,
    layout: "/auth",
  },
];

// Definir `dashRoutes` según el rol
let dashRoutes = [];
if (role === "1") {
  dashRoutes = [...adminRoutes];
} else if (role === "2") {
  dashRoutes = [...userRoutes];
} else {
  dashRoutes = [...commonRoutes];
}

// Exportar `dashRoutes`
export default dashRoutes;