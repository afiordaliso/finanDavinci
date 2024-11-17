import { Box } from "@chakra-ui/react";

import inicioRoles from 'assets/img/iconos/inicioRoles.png';
import inicioTablero from 'assets/img/iconos/inicioTablero.png';
import nosotrosIcon from 'assets/img/iconos/nosotrosIcon.png';
import contactoIcon from 'assets/img/iconos/contactoIcon.png';
import gestionUsuarios from 'assets/img/iconos/gestionUsuarios.png';
import gestionCategorias from 'assets/img/iconos/gestionCategorias.png';
import loginIcon from 'assets/img/iconos/loginIcon.png';

export const InicioRolesIcon = () => (
  <Box as="img" src={inicioRoles} alt="inicioRolesIcon" width="24px" height="24px" />
);

export const InicioTablero = () => (
  <Box as="img" src={inicioTablero} alt="inicioTablero" width="24px" height="24px" />
);

export const NosotrosIcon = () => (
  <Box as="img" src={nosotrosIcon} alt="nosotrosIcon" width="24px" height="24px" />
);

export const ContactoIcon = () => (
  <Box as="img" src={contactoIcon} alt="contactoIcon" width="24px" height="24px" />
);

export const GestionUsuarios = () => (
  <Box as="img" src={gestionUsuarios} alt="gestionUsuarios" width="24px" height="24px" />
);

export const GestionCategorias = () => (
  <Box as="img" src={gestionCategorias} alt="gestionCategorias" width="24px" height="24px" />
);

export const LoginIcon = () => (
  <Box as="img" src={loginIcon} alt="loginIcon" width="24px" height="24px" />
);