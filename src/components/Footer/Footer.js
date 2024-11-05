
import React from "react";
import { Flex, Link, List, ListItem, Text, useColorModeValue } from "@chakra-ui/react";

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
        para ayudarte a gestionar las finanzas de tu negocio.
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color={mainTeal} href="/about">
            Sobre Nosotros
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color={mainTeal} href="/privacy-policy">
            Política de Privacidad
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color={mainTeal} href="/blog">
            Blog
          </Link>
        </ListItem>
        <ListItem>
          <Link color={mainTeal} href="/terms-of-service">
            Términos y Condiciones
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
