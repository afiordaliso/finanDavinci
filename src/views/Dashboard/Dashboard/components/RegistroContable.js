import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Box,
  useToast,
  Spinner,
  Text
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { useEffect, useState } from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import React from "react";
import { jwtDecode } from "jwt-decode";

const RegistroContable = ({ title }) => {
  // Estados
  const [categorias, setCategorias] = useState([]);
  const [importe, setImporte] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const toast = useToast();

  // Obtener y validar token/usuario
  const getUserFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token de autenticación");
      }
      const decodedToken = jwtDecode(token);
      if (!decodedToken.id) {
        throw new Error("Token inválido");
      }
      return { token, userId: decodedToken.id };
    } catch (error) {
      console.error("Error de autenticación:", error);
      toast({
        title: "Error de autenticación",
        description: "Sesión expirada o inválida",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return null;
    }
  };

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      setIsLoading(true);
      setError(null);
      const auth = getUserFromToken();
      if (!auth) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/categorias", {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error al cargar categorías: ${response.statusText}`);
        }
        
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        setError("Error al cargar las categorías. Por favor intente nuevamente.");
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, [toast]);

  // Manejar envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const auth = getUserFromToken();
    if (!auth) {
      setIsSubmitting(false);
      return;
    }

    if (!importe || !categoriaId) {
      toast({
        title: "Campos requeridos",
        description: "Por favor complete todos los campos.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    const data = {
      usuario_id: auth.userId,
      categoria_id: categoriaId,
      monto: parseFloat(importe),
    };

    try {
      const response = await fetch('http://localhost:5000/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al guardar el registro');
      }
      
      const result = await response.json();
      // Limpiar el formulario
      setImporte("");
      setCategoriaId("");
      
      toast({
        title: "Éxito",
        description: "Registro guardado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card p="16px" mt="16px">
        <CardBody>
          <Flex justify="center" align="center" h="200px">
            <Spinner />
          </Flex>
        </CardBody>
      </Card>
    );
  }

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
          {error && (
            <Text color="red.500" mb={4}>
              {error}
            </Text>
          )}
          
          <form onSubmit={handleSubmit}>
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
                    value={importe}
                    onChange={(e) => setImporte(e.target.value)}
                    focusBorderColor="teal.300"
                    borderWidth="2px"
                    _placeholder={{ color: "gray.400" }}
                    isDisabled={isSubmitting}
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
                    Categoría
                  </FormLabel>
                  <Select
                    fontSize="sm"
                    placeholder="Seleccione una categoría"
                    borderRadius="15px"
                    focusBorderColor="teal.300"
                    borderWidth="2px"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    isDisabled={isSubmitting}
                  >
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.categoria_id}
                        value={categoria.categoria_id}
                      >
                        {categoria.nombre}
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
                    boxShadow: "md",
                  }}
                  _active={{
                    bg: "teal.500",
                    transform: "translateY(0)",
                  }}
                  transition="all 0.2s"
                  isLoading={isSubmitting}
                  loadingText="Guardando..."
                >
                  Guardar Registro
                </Button>
              </Flex>
            </FormControl>
          </form>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RegistroContable;