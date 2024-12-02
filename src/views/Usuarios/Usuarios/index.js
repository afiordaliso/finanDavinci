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
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import theme from 'theme/theme.js';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/usuarios';

export default function usuariosTable() {
  const [usuarios, setusuarios] = useState([]);
  const [selectedusuarios, setSelectedusuarios] = useState(null);
  const [editValues, setEditValues] = useState({ usuario: '', rol: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  // Obtener usuarios de la API al montar el componente
  useEffect(() => {
    fetchusuarios();
  }, []);

  const fetchusuarios = async () => {
    try {
      const response = await axios.get(API_URL);
      setusuarios(response.data);
    } catch (error) {
      toast({
        title: 'Error al cargar los usuarios',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (usuarios) => {
    setSelectedusuarios(usuarios);
    setEditValues({ usuario: usuarios.usuario, rol: usuarios.rol });
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(`${API_URL}/${selectedusuarios.id}`, editValues);
      toast({
        title: `Usuario ${editValues.usuario} actualizado`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchusuarios(); // Actualizar lista después de la edición
      onClose();
    } catch (error) {
      toast({
        title: 'Error al actualizar el usuario',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = (usuarios) => {
    setSelectedusuarios(usuarios);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedusuarios.id}`);
      toast({
        title: `Usuario ${selectedusuarios.usuario} eliminado`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchusuarios(); // Actualizar lista después de la eliminación
      onDeleteClose();
    } catch (error) {
      toast({
        title: 'Error al eliminar el usuario',
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
        <Table variant="simple">
          <Thead bg="teal.200">
            <Tr>
              <Th color="white">Usuario</Th>
              <Th color="white">Rol</Th>
              <Th color="white">Gestión</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((usuarios) => (
              <Tr key={usuarios.id}>
                <Td>{usuarios.mail}</Td>
                <Td>{usuarios.rol_nombre}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEdit(usuarios)}
                    aria-label="Editar usuario"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(usuarios)}
                    aria-label="Eliminar usuario"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Modal de Editar */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Usuario</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Usuario</FormLabel>
                <Input
                  type="text"
                  name="usuario"
                  value={editValues.usuario}
                  onChange={handleInputChange}
                  placeholder="Nombre del usuario"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rol</FormLabel>
                <Select
                  name="rol"
                  value={editValues.rol}
                  onChange={handleInputChange}
                  placeholder="Seleccionar rol"
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
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

        {/* Modal de Confirmación de Eliminar */}
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmar Eliminación</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              ¿Estás seguro de que deseas eliminar al usuario <strong>{selectedusuarios?.usuario}</strong>?
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
