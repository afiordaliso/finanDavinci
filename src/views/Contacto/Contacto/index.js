import React from 'react';
import { ChakraProvider, Box, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, VStack, Portal } from '@chakra-ui/react';
import theme from 'theme/theme.js';
import Footer from "components/Footer/Footer.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";

export default function ContactPage() {
  return (
    <ChakraProvider theme={theme}>

      <Portal>
        <AuthNavbar logoText="FinanDavinci" />
      </Portal>

      <Box
        bg="teal.200"
        color="white"
        py={100}
        textAlign="center"
        borderRadius="10px"
      >
        <Heading as="h1" size="xl" mb={5}>
          Contáctanos
        </Heading>
        <Text fontSize="lg">
          Nos encantaría saber de ti. Completa el formulario para enviarnos un mensaje.
        </Text>
      </Box>

      <Box py={10} px={{ base: 6, md: 16 }} maxW="600px" mx="auto">
        <VStack spacing={6}>
          <FormControl id="name" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input placeholder="Ingresa tu nombre" />
          </FormControl>
          
          <FormControl id="email" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input type="email" placeholder="Ingresa tu correo electrónico" />
          </FormControl>
          
          <FormControl id="message" isRequired>
            <FormLabel>Mensaje</FormLabel>
            <Textarea placeholder="Escribe tu mensaje aquí" />
          </FormControl>
          
          <Button colorScheme="teal" size="lg" width="full">
            Enviar Mensaje
          </Button>
        </VStack>
      </Box>

      <Box bg="gray.50" py={10} px={{ base: 6, md: 16 }} textAlign="center">
        <Heading as="h2" size="lg" mb={4}>
          Información de Contacto
        </Heading>
        <Text fontSize="md" mb={2}>Teléfono: +123 456 7890</Text>
        <Text fontSize="md" mb={2}>Correo: contacto@finandavinci.com</Text>
        <Text fontSize="md">Dirección: Calle Falsa 123, CABA, Argentina</Text>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
