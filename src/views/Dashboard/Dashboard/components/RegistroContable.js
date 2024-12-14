// Chakra imports
import {
  Button,
  Flex,
  Text,
  FormControl,
  useColorModeValue,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";

import {
    Select,
} from "@chakra-ui/select"

import { useEffect, useState } from "react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import React from "react";

const RegistroContable = ({ title }) => {
const iconTeal = useColorModeValue("teal.300", "teal.300");
const textColor = useColorModeValue("gray.700", "white");
const borderColor = useColorModeValue("#dee2e6", "gray.500");
const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
);
const [categorias, setCategorias] = useState([]);
const [ingresos, setIngresos] = useState([]);
const [gastos, setGastos] = useState([]);

useEffect(() => {
    // Acceder a las categorías de la API
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categorias');
        const data = await response.json();
        setCategorias(data);
        setIngresos(data.filter(cat => cat.tipoTransaccion.toLowerCase() === 'ingreso')); 
        setGastos(data.filter(cat => cat.tipoTransaccion.toLowerCase() === 'gasto')); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategorias();
  }, []);


  return (
    <Card p="16px" mt="16px">
      <CardBody>
      <Flex 
        p="1rem" 
        bg="transparent" 
        borderRadius="15px" 
        width="100%" 
        flexDirection="column"
        align="stretch"
      >
        <FormControl spacing={4}>
          <Flex flexDirection="column" gap={4}>
            <Box>
              <FormLabel 
                ms="4px" 
                fontSize="sm" 
                fontWeight="bold" 
                color="gray.600" 
                mb={2}
              >
                Importe
              </FormLabel>
              <Input 
                borderRadius="15px" 
                fontSize="sm" 
                type="number" 
                placeholder="Ingrese el importe" 
                size="lg"
                focusBorderColor="teal.300"
                borderWidth="2px"
                _placeholder={{ color: "gray.400" }}
              />
            </Box>

            <Box>
              <FormLabel 
                ms="4px" 
                fontSize="sm" 
                fontWeight="bold" 
                color="gray.600" 
                mb={2}
              >
                Categoría de Ingreso
              </FormLabel>
              <Select 
                fontSize="sm" 
                placeholder="Seleccione un ingreso"
                borderRadius="15px"
                focusBorderColor="teal.300"
                borderWidth="2px"
              >
                {ingresos.map(ingreso => (
                  <option 
                    key={ingreso.id} 
                    value={ingreso.id}
                  >
                    {ingreso.nombre}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <FormLabel 
                ms="4px" 
                fontSize="sm" 
                fontWeight="bold" 
                color="gray.600" 
                mb={2}
              >
                Categoría de Egreso
              </FormLabel>
              <Select 
                fontSize="sm" 
                placeholder="Seleccione un gasto"
                borderRadius="15px"
                focusBorderColor="teal.300"
                borderWidth="2px"
              >
                {gastos.map(gasto => (
                  <option 
                    key={gasto.id} 
                    value={gasto.id}
                  >
                    {gasto.nombre}
                  </option>
                ))}
              </Select>
            </Box>

            <Button 
              fontSize="sm" 
              type="submit" 
              bg="teal.300" 
              w="100%" 
              h="45px" 
              color="white" 
              mt="10px"
              _hover={{ 
                bg: "teal.400",
                transform: "translateY(-2px)",
                boxShadow: "md"
              }}
              _active={{ 
                bg: "teal.500",
                transform: "translateY(0)"
              }}
              transition="all 0.2s"
            >
              Guardar Registro
            </Button>
          </Flex>
        </FormControl>
      </Flex>
      </CardBody>
    </Card>
  );
};

export default RegistroContable;
