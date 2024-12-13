// Chakra imports
import {
  Button,
  Flex,
  Text,
  FormControl,
  useColorModeValue,
  FormLabel,
  Input,
  createListCollection,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {
    Select,
} from "@chakra-ui/select"

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const RegistroContable = ({ title }) => {
const iconTeal = useColorModeValue("teal.300", "teal.300");
const textColor = useColorModeValue("gray.700", "white");
const borderColor = useColorModeValue("#dee2e6", "gray.500");
const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
);
const [gastos, setGastos] = useState([]);
const [ingresos, setIngresos] = useState([]);

useEffect(() => {
    // Acceder a la API Categorías
    const fetchCategorias = async () => {
      const response = await fetch('/api/categorias');
      const data = await response.json();
      setGastos(data.filter(cat => cat.tipoTransaccion === 'gasto'));
      setIngresos(data.filter(cat => cat.tipoTransaccion === 'ingreso'));
    };
    fetchCategorias();
  }, []);

  return (
    <Card p="16px" mt="16px">
      <CardBody>
        <Flex p="1rem" bg="transparent" borderRadius="15px" width="100%" align="center" mb={{ sm: "24px", md: "0px" }} me={{ sm: "0px", md: "24px" }}>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">Importe</FormLabel>
            <Input borderRadius="15px" mb="24px" fontSize="sm" type="text" placeholder="Ingrese el importe" size="lg" />
            
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">Ingresos</FormLabel>
            <Select>
              {ingresos.map(ingreso => (
                <option key={ingreso.id} value={ingreso.id}>{ingreso.nombre}</option>
              ))}
            </Select>

            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">Egresos</FormLabel>
            <Select>
              {gastos.map(gasto => (
                <option key={gasto.id} value={gasto.id}>{gasto.nombre}</option>
              ))}
            </Select>

            <Button fontSize="10px" type="submit" bg="teal.300" w="100%" h="45" mb="20px" color="white" mt="20px" _hover={{ bg: "teal.200" }} _active={{ bg: "teal.400" }}>
              Guardar Registro
            </Button>
          </FormControl>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RegistroContable;