import React from "react";
import { Flex, List, Box, ListItem, Text, useColorModeValue } from "@chakra-ui/react";
import {Link} from "react-router-dom";

export default function Footer(props) {
  
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let mainText = useColorModeValue("gray.700", "gray.200");

  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color={mainText}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">
          Creado con ❤️ por FinanDavinci
        </Text>{" "}
        para ayudarte a gestionar tus finanzas.
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Box as="span" color={mainTeal} ms="5px">
            <Link to="/user/nosotros">Sobre Nosotros</Link>
          </Box>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Box as="span" color={mainTeal} ms="5px">
            <Link to="/user/Contacto">Contáctanos</Link>
          </Box>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <a
            href="https://www.bancodeserviciosfinancieros.com.ar/blog-educacion-financiera/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box as="span" color={mainTeal}>
              Blog
            </Box>
          </a>
        </ListItem>
      </List>
    </Flex>
  );
}
