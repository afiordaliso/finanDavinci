import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import theme from 'theme/theme.js';
import axios from 'axios';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTransaction, setNewTransaction] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editValues, setEditValues] = useState({ nombre: '', tipoTransaccion: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  const API_URL = 'http://localhost:5000/api/categorias';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      toast({
        title: 'Error al cargar las categorías.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim() || !newTransaction) {
      toast({
        title: 'Error',
        description: 'Todos los campos son obligatorios.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        nombre: newCategory,
        tipoTransaccion: newTransaction,
      });

      setCategories([...categories, response.data]);
      setNewCategory('');
      setNewTransaction('');
      toast({
        title: 'Categoría agregada',
        description: `La categoría "${newCategory}" ha sido agregada con éxito.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (categoria) => {
    setSelectedCategory({...categoria});
    setEditValues({ nombre: categoria.nombre, tipoTransaccion: categoria.tipoTransaccion });
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(`${API_URL}/${selectedCategory.id}`, editValues);
      toast({
        title: `Categoría "${editValues.nombre}" actualizada`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchCategories();
      onClose();
    } catch (error) {
      toast({
        title: 'Error al actualizar la categoría',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = (categorias) => {
    setSelectedCategory({...categorias});
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedCategory.id}`);
      setCategories(categories.filter((cat) => cat.id !== selectedCategory.id)); // Filtrar la categoría eliminada
      toast({
        title: `Categoría ${selectedCategory.nombre} eliminada`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setSelectedCategory(null); // Limpiar el estado después de eliminar
      onDeleteClose();
    } catch (error) {
      toast({
        title: 'Error al eliminar la categoría',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="800px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <FormControl mb={4}>
          <FormLabel>Agregar nueva categoría</FormLabel>
          <Input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nombre de la categoría"
          />
          <FormLabel mt={4}>Tipo de Transacción</FormLabel>
          <Select
            value={newTransaction}
            onChange={(e) => setNewTransaction(e.target.value)}
            placeholder="Seleccionar tipo"
          >
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
          </Select>
          <Button mt={5} colorScheme="teal" leftIcon={<AddIcon />} onClick={handleAddCategory}>
            Agregar Categoría
          </Button>
        </FormControl>

        <Table variant="simple">
          <Thead bg="teal.200">
            <Tr>
              <Th color="white">Nombre</Th>
              <Th color="white">Tipo de Transacción</Th>
              <Th color="white">Gestión</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.id}>
                <Td>{category.nombre}</Td>
                <Td>{category.tipoTransaccion}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEdit(category)}
                    aria-label="Editar categoría"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(category)}
                    aria-label="Eliminar categoría"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Categoría</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Categoría</FormLabel>
                <Input
                  type="text"
                  name="nombre"
                  value={editValues.nombre}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Tipo de Transacción</FormLabel>
                <Select
                  name="tipoTransaccion"
                  value={editValues.tipoTransaccion}
                  onChange={handleInputChange}
                >
                  <option value="Ingreso">Ingreso</option>
                  <option value="Gasto">Gasto</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveChanges}>
                Guardar Cambios
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmar Eliminación</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              ¿Estás seguro de que deseas eliminar la categoría <strong>{selectedCategory?.nombre}</strong>?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                Eliminar
              </Button>
              <Button variant="ghost" onClick={onDeleteClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}