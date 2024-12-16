import React, { useEffect, useState } from "react";
import { Flex, Grid, SimpleGrid, useColorModeValue, Text } from "@chakra-ui/react";
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon } from "components/Icons/Icons.js";
import MiniStatistics from "./components/MiniStatistics";
import Transactions from "./components/Transactions";
import RegistroContable from "./components/RegistroContable.js";
import Pie from "./components/Pie.js";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [pieData, setPieData] = useState({
    labels: [],
    values: [],
  });
  const [totalIngresos, setTotalIngresos] = useState(null);
  const [percentageIngresos, setPercentageIngresos] = useState(null);
  const [totalGastos, setTotalGastos] = useState(null);
  const [percentageGastos, setPercentageGastos] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null); // Balance total
  const [percentageBalance, setPercentageBalance] = useState(null); // Porcentaje del balance

  // Nueva función fetchTotalBalance
  const fetchTotalBalance = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token no disponible en localStorage");
        return;
      }

      // Fetch datos para ingresos
      const ingresosResponse = await fetch("http://localhost:5000/api/ingresos/total_ingresos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!ingresosResponse.ok) {
        throw new Error("Error al obtener los ingresos");
      }
      const ingresosData = await ingresosResponse.json();
      if (ingresosData.length > 0) {
        const totalActual = parseFloat(ingresosData[0].total_actual);
        const porcentajeCrecimiento = parseFloat(ingresosData[0].porcentaje_crecimiento);
        setTotalIngresos(totalActual);
        setPercentageIngresos(porcentajeCrecimiento.toFixed(2));
      } else {
        setTotalIngresos(0);
        setPercentageIngresos(0);
      }

      // Fetch datos para gastos
      const gastosResponse = await fetch("http://localhost:5000/api/gastos/total_gastos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!gastosResponse.ok) {
        throw new Error("Error al obtener los gastos");
      }
      const gastosData = await gastosResponse.json();
      if (gastosData.length > 0) {
        const totalActual = parseFloat(gastosData[0].total_actual);
        const porcentajeCrecimiento = parseFloat(gastosData[0].porcentaje_crecimiento);
        setTotalGastos(totalActual);
        setPercentageGastos(porcentajeCrecimiento.toFixed(2));
      } else {
        setTotalGastos(0);
        setPercentageGastos(0);
      }

      // Fetch datos para el gráfico de balance
      const balanceResponse = await fetch("http://localhost:5000/api/balance/pie", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!balanceResponse.ok) {
        throw new Error("Error al obtener los datos del balance");
      }
      const balanceData = await balanceResponse.json();
      const labels = balanceData.map((item) => item.nombre);
      const values = balanceData.map((item) => item.total);
      setPieData({ labels, values });

      // Calcular balance
      const balance = (ingresosData[0]?.total_actual || 0) - (gastosData[0]?.total_actual || 0);
      setTotalBalance(balance);
      setPercentageBalance(((balance / (ingresosData[0]?.total_actual || 1)) * 100).toFixed(2));
    } catch (error) {
      console.error("Error en fetchTotalBalance:", error.message);
    }
  };

  useEffect(() => {
    // Llama a la función al montar el componente
    fetchTotalBalance();

    // Actualizar datos cada 5 segundos
    const interval = setInterval(() => {
      fetchTotalBalance();
    }, 5000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatistics 
          title="Ingresos" 
          amount={`$${totalIngresos ? totalIngresos.toLocaleString() : 0}`} 
          percentage={percentageIngresos} 
          icon={<WalletIcon />} 
        />
        <MiniStatistics 
          title="Gastos" 
          amount={`$${totalGastos ? totalGastos.toLocaleString() : 0}`} 
          percentage={`-${percentageGastos}`} 
          icon={<GlobeIcon />} 
        />
        <MiniStatistics 
          title="Balance" 
          amount={`$${totalBalance !== null ? totalBalance.toLocaleString() : 0}`} 
          percentage={percentageBalance} 
          icon={<DocumentIcon />} 
        />
      </SimpleGrid>

      <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} gap="24px">
        <RegistroContable title="Payment Method" />
        {pieData.labels.length === 0 || pieData.values.length === 0 ? (
          <Text>No se han recibido datos para mostrar el gráfico de torta.</Text>
        ) : (
          <Pie data={pieData} title="Distribución de Gastos e Ingresos" />
        )}
      </Grid>

      <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "1fr" }} gap="24px">
        <Transactions title="Transacciones" date="27 Nov - 30 Marz" />
      </Grid>
    </Flex>
  );
}
