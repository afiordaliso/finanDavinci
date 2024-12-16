import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

function SignIn() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const toast = useToast();

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true); // Activar estado de carga

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: email, contrasena: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar información en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.id_rol);


        // Emitir evento de usuario logueado
        window.dispatchEvent(new Event("userLoggedIn"));

        // Redirigir según el rol
        redirectByRole(data.id_rol);
      } else {
        toast({
          title: "Inicio de sesión fallido",
          description: data.error || "Credenciales incorrectas.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      toast({
        title: "Error del servidor",
        description: "No se pudo conectar al servidor. Intente más tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };

  // Función para redirigir según el rol
  const redirectByRole = (roleId) => {
    if (roleId === 1) {
      history.push("/admin/dashboard");
    } else if (roleId === 2) {
      history.push("/user/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Rol no reconocido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        {/* Formulario de Inicio de Sesión */}
        <Flex
          alignItems="center"
          justifyContent="start"
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Bienvenidos
            </Heading>
            <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="14px">
              Ingrese su correo y su contraseña
            </Text>
            <form onSubmit={handleLogin}>
              <FormControl isRequired>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Correo
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="email"
                  placeholder="Ingrese su correo"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Contraseña
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center" mt="20px">
                <Switch
                  id="remember-me"
                  colorScheme="teal"
                  isChecked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <FormLabel htmlFor="remember-me" mb="0" ms="1" fontWeight="normal">
                  Recordar cuenta
                </FormLabel>
              </FormControl>
              <Button
                fontSize="sm"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mt="24px"
                color="white"
                _hover={{ bg: "teal.200" }}
                _active={{ bg: "teal.400" }}
                isLoading={isLoading}
                loadingText="Ingresando"
              >
                Ingresar
              </Button>
            </form>
            <Flex justifyContent="center" alignItems="center" mt="20px">
              <Text color={textColor} fontWeight="medium">
                ¿No tienes cuenta?
                <Box as="span" color={titleColor} ms="5px" fontWeight="bold">
                  <Link to="/auth/signup">Regístrate</Link>
                </Box>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* Placeholder para contenido adicional */}
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        ></Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
