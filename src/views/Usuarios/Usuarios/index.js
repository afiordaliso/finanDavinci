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
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import theme from 'theme/theme.js';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/usuarios';

export default function UsuariosTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [editValues, setEditValues] = useState({ usuario: '', id_rol: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  // Mapeo de roles
  const rolesMap = {
    1: 'Usuario',
    2: 'Administrador',
  };

  // Obtener usuarios de la API al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('Usuarios cargados:', response.data);
      setUsuarios(response.data);
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

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario); // Asegúrate de que contiene `usuario_id`
    setEditValues({ usuario: usuario.usuario, id_rol: usuario.id_rol });
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    if (!selectedUsuario || !selectedUsuario.usuario_id) {
      toast({
        title: 'Error',
        description: 'El ID del usuario no está disponible.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.put(`${API_URL}/${selectedUsuario.usuario_id}`, editValues);
      toast({
        title: `Usuario actualizado`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsuarios();
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

  const handleDelete = (usuario) => {
    console.log('Usuario seleccionado para eliminar:', usuario);
    setSelectedUsuario(usuario);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    if (!selectedUsuario || !selectedUsuario.usuario_id) {
      toast({
        title: 'Error',
        description: 'El ID del usuario no está disponible.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log('Eliminando usuario:', selectedUsuario);

    try {
      await axios.delete(`${API_URL}/${selectedUsuario.usuario_id}`);
      toast({
        title: `Usuario ${selectedUsuario.usuario} eliminado`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsuarios();
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
            {usuarios.map((usuario) => (
              <Tr key={usuario.usuario_id}>
                <Td>{usuario.mail}</Td>
                {/* Mostrar el nombre del rol en lugar del id */}
                <Td>{rolesMap[usuario.id_rol] || 'Desconocido'}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEdit(usuario)}
                    aria-label="Editar usuario"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(usuario)}
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
              <FormControl>
                <FormLabel>Rol</FormLabel>
                <Select
                  name="id_rol"
                  value={editValues.id_rol}
                  onChange={handleInputChange}
                  placeholder="Seleccionar rol"
                >
                  {/* Opciones para seleccionar el id del rol */}
                  <option value="1">Usuario</option>
                  <option value="2">Administrador</option>
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
              ¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUsuario?.mail}</strong>?
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
