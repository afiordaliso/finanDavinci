import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import theme from 'theme/theme.js';

export default function CategoryPage() {
  const [categories, setCategories] = useState([
    { id: 1, nombre: 'Sueldo' },
    { id: 2, nombre: 'Otros' },
    { id: 3, nombre: 'Supermercado' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      toast({
        title: 'El nombre de la categoría es obligatorio.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newCat = { id: Date.now(), nombre: newCategory };
    setCategories([...categories, newCat]);
    setNewCategory('');
    toast({
      title: `Categoría "${newCategory}" agregada`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditName(category.nombre);
    onOpen();
  };

  const saveChanges = () => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === selectedCategory.id ? { ...cat, nombre: editName } : cat
      )
    );
    toast({
      title: `Categoría "${editName}" actualizada`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    toast({
      title: `Categoría "${selectedCategory.nombre}" eliminada`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onDeleteClose();
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
          <Button mt={3} colorScheme="teal" leftIcon={<AddIcon />} onClick={handleAddCategory}>
            Agregar Categoría
          </Button>
        </FormControl>

        <Table variant="simple">
          <Thead bg="teal.200">
            <Tr>
              <Th color="white">Nombre</Th>
              <Th color="white">Gestión</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.id}>
                <Td>{category.nombre}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEditCategory(category)}
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

        {/* Modal de Editar Categoría */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Categoría</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nombre de la categoría</FormLabel>
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveChanges}>
                Guardar Cambios
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de Confirmación de Eliminar */}
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
              <Button variant="ghost" onClick={onDeleteClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}
