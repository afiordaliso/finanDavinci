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
  Select,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import theme from 'theme/theme.js';

const usersData = [
  { id: 1, usuario: 'Juan Pérez', rol: 'Administrador' },
  { id: 2, usuario: 'Ana Gómez', rol: 'Usuario' },
  { id: 3, usuario: 'Carlos Ruiz', rol: 'Usuario' },
];

export default function UserTable() {
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editValues, setEditValues] = useState({ usuario: '', rol: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditValues({ usuario: user.usuario, rol: user.rol });
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === selectedUser.id ? { ...user, ...editValues } : user))
    );
    toast({
      title: `Usuario ${editValues.usuario} actualizado`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
    toast({
      title: `Usuario ${selectedUser.usuario} eliminado`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onDeleteClose();
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
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.usuario}</Td>
                <Td>{user.rol}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEdit(user)}
                    aria-label="Editar usuario"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(user)}
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
              ¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUser?.usuario}</strong>?
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
