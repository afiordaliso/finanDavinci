import React, { 
  useState,
} from "react";
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
} from "@chakra-ui/react";

function SignIn() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const [mail, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const history = useHistory(); // Hook para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, contrasena }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Guardar datos en localStorage
        if (remember) {
          localStorage.setItem("token", data.token);
        }
        localStorage.setItem("role", data.id_rol);
  
        // Emitir evento de usuario logueado
        window.dispatchEvent(new Event("userLoggedIn"));
  
        // Redirigir según el rol
        if (data.id_rol === 1) {
          history.push("/admin/dashboard");
        } else if (data.id_rol === 2) {
          history.push("/user/dashboard");
        } else {
          alert("Rol no reconocido");
        }
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("No se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde.");
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
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
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
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Ingrese su correo y su contraseña
            </Text>
            <FormControl>
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
                value={mail}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Contraseña
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder="Ingrese su contraseña"
                size="lg"
                value={contrasena}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControl display="flex" alignItems="center">
                <Switch
                  id="remember-login"
                  colorScheme="teal"
                  me="10px"
                  isChecked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Recordar Cuenta
                </FormLabel>
              </FormControl>
              <Button
                fontSize="10px"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                onClick={handleLogin}
              >
                Ingresar
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                No tienes cuenta?
                <Box as="span" color={titleColor} ms="5px" fontWeight="bold">
                  <Link to="/auth/signup">Registrarse</Link>
                </Box>
              </Text>
            </Flex>
          </Flex>
        </Flex>
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
