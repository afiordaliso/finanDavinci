import React from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Avatar,
  SimpleGrid,
  Portal,
} from "@chakra-ui/react";
//import Footer from "components/Footer/Footer.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import theme from "theme/theme.js";
import BgSignUp from "assets/img/BgSignUp.png";

const teamMembers = [
  {
    name: "Juan Pérez",
    role: "CEO & Fundador",
    image: "https://via.placeholder.com/150",
    description: "Juan tiene más de 20 años de experiencia en el sector...",
  },
  {
    name: "Ana Gómez",
    role: "Directora de Marketing",
    image: "https://via.placeholder.com/150",
    description: "Ana es especialista en estrategias de marketing digital...",
  },
  {
    name: "Ricardo Rodriguez",
    role: "Director de Desarrollo",
    image: "https://via.placeholder.com/150",
    description:
      "Ricardo es especialista en estrategias de desarrollo en distintos lenguajes...",
  },
];

export default function Nosotros(props) {
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
        bgImage={BgSignUp}
      >
        <Heading as="h1" size="xl" mb={5}>
          Sobre Nosotros
        </Heading>
        <Text fontSize="lg">
          Conoce más sobre nuestro equipo y nuestra misión.
        </Text>
      </Box>
      <Box py={10} px={{ base: 6, md: 16 }}>
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Nuestra Misión
        </Heading>
        <Text fontSize="md" textAlign="center" maxW="800px" mx="auto" mb={10}>
          En FinanDavinci, nuestra misión es ofrecer soluciones innovadoras para
          el manejo financiero. Nos dedicamos a construir herramientas que
          faciliten la vida de nuestros usuarios y les ayuden a alcanzar sus
          metas.
        </Text>
      </Box>
      <Box py={10} px={{ base: 6, md: 16 }} bg="gray.50">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Nuestro Equipo
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={8}>
          {teamMembers.map((member, index) => (
            <Box
              key={index}
              textAlign="center"
              p={5}
              bg="white"
              borderRadius="md"
              shadow="md"
            >
              <Avatar size="xl" src={member.image} mb={4} />
              <Heading as="h3" size="md">
                {member.name}
              </Heading>
              <Text fontWeight="bold" color="teal.500">
                {member.role}
              </Text>
              <Text fontSize="sm" mt={2}>
                {member.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

    </ChakraProvider>
  );
}
