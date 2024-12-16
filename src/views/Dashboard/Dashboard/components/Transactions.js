// Chakra imports
import { Flex, Icon, Text, useColorModeValue, Spinner } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TransactionRow from "components/Tables/TransactionRow";
import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";
import { SiDropbox } from "react-icons/si";

const Transactions = ({ title, date, apiUrl }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  // State to store transactions
  const [newestTransactions, setNewestTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [transactionsPerPage] = useState(10); // Número de transacciones por página

  // Fetch transactions from the API
  useEffect(() => {
    // Function to fetch transactions
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado en el almacenamiento local");

        const response = await fetch(
          `http://localhost:5000/api/vista_balance_usuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener las transacciones");

        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );

        setNewestTransactions(sortedData); // Actualiza el estado con las transacciones más recientes
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchTransactions();

    // Polling: Llama a fetchTransactions cada 30 segundos
    const intervalId = setInterval(fetchTransactions, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  // Paginación: Calcula las transacciones a mostrar en la página actual
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = newestTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  if (loading) {
    return (
      <Card my="24px" ms={{ lg: "5px" }}>
        <CardBody>
          <Flex justify="center" align="center" minHeight="100px">
            <Spinner size="xl" />
          </Flex>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card my="24px" ms={{ lg: "5px" }}>
      <CardHeader mb="12px">
        <Flex direction="column" w="100%">
          <Flex
            direction={{ sm: "column", lg: "row" }}
            justify={{ sm: "center", lg: "space-between" }}
            align={{ sm: "center" }}
            w="100%"
            my={{ md: "5px" }}
          >
            <Text
              color={textColor}
              fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
              fontWeight="bold"
            >
              {title}
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          {currentTransactions.map((row) => {
            return (
              <TransactionRow
                key={row.balance_id}
                name={row.nombre_categoria}
                logo={row.logo === "FaArrowUp" ? FaArrowUp : FaArrowDown}
                date={new Date(row.fecha).toLocaleString()}
                price={row.monto}
              />
            );
          })}

          {/* Paginación */}
          <Flex justify="center" mt="20px">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <Text mx="5px">{`Página ${currentPage}`}</Text>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * transactionsPerPage >= newestTransactions.length}
            >
              Siguiente
            </button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Transactions;
