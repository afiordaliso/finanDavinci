import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "routes.js";
import theme from "theme/theme.js";


export default function Auth() {
  const [role, setRole] = useState(null); // Estado para el rol
  const [filteredRoutes, setFilteredRoutes] = useState([]); // Estado para las rutas filtradas

  // Ref para el wrapper div
  const wrapper = React.createRef();

  useEffect(() => {
    document.body.style.overflow = "unset";
    return function cleanup() {};
  }, []);

  // Cargar el rol desde localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "guest";
    setRole(storedRole);
  }, []);

  // Filtrar las rutas según el rol
  useEffect(() => {
    if (role) {
      if (role === "1") {
        setFilteredRoutes(routes.filter(route => route.layout === "/admin"));
      } else if (role === "2") {
        setFilteredRoutes(routes.filter(route => route.layout === "/user"));
      } else {
        setFilteredRoutes(routes.filter(route => route.layout === "/auth"));
      }
    }
  }, [role]);


  const getRoutes = (filteredRoutes) => {
    return filteredRoutes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };

  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box w="100%">
        <Portal>
          <AuthNavbar secondary={false} logoText="FinanDavinci" />
        </Portal>
        <Box w="100%">
          <Box ref={wrapper} w="100%">
            <Switch>
              {/* Renderizar rutas filtradas dinámicamente */}
              {getRoutes(filteredRoutes)}

              {/* Redirección predeterminada */}
              <Redirect
                exact
                from="/"
                to={
                  role === "1"
                    ? "/admin/dashboard"
                    : role === "2"
                    ? "/user/dashboard"
                    : "/auth/signin"
                }
              />
            </Switch>
          </Box>
        </Box>
        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <Footer />
        </Box>
      </Box>
    </ChakraProvider>
  );
}
