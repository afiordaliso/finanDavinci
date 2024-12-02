import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  const [formData, setFormData] = useState({
    nombre: "",
    mail: "",
    contrasena: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple de formulario
    if (!formData.nombre || !formData.mail || !formData.contrasena) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    setErrorMessage("");

    try {
      // Aquí debes enviar los datos al backend (suponiendo que usas fetch)
      const response = await fetch("http://localhost:5000/api/register", {
        // Cambia la URL según sea necesario
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Si la respuesta es exitosa
        const data = await response.json();
        setSuccessMessage("¡Te has registrado exitosamente!");
        setFormData({
          nombre: "",
          mail: "",
          contrasena: ""
        });
      } else {
        // Si hubo un error
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Hubo un error en el registro.");
      }
    } catch (error) {
      setErrorMessage("Error en la conexión con el servidor.");
    }
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          ¡Bienvenido!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Regístrate para que puedas acceder a las funcionalidades de la
          plataforma
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Nombre
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Tu nombre completo"
              mb="24px"
              size="lg"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Correo
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="email"
              placeholder="Correo electrónico"
              mb="24px"
              size="lg"
              name="mail"
              value={formData.mail}
              onChange={handleInputChange}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Contraseña
            </FormLabel>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="password"
              placeholder="Contraseña"
              mb="24px"
              size="lg"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
            />
            <HStack mb="24px" justify="space-between">
              <HStack spacing="5px">
                <Text color="gray.400" fontSize="sm">
                  ¿Ya tienes cuenta?
                </Text>
                <Link to="/login">
                  <Button variant="link" colorScheme="teal" size="sm">
                    Iniciar sesión
                  </Button>
                </Link>
              </HStack>
            </HStack>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            {successMessage && <Text color="green.500">{successMessage}</Text>}
            <Button
              variant="solid"
              colorScheme="teal"
              w="100%"
              h="45"
              mb="24px"
              type="submit"
              onClick={handleSubmit}
            >
              Crear cuenta
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
