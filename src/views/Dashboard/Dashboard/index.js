// Chakra imports
import {
  Flex,
  Grid,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect } from "react";
import { 
  newestTransactions,
  olderTransactions
} from "variables/general";
import MiniStatistics from "./components/MiniStatistics";
import Transactions from "./components/Transactions";
import RegistroContable from "./components/RegistroContable.js";
import Pie from "./components/Pie.js";

export default function Dashboard() {
  
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.400", "white");
  const pieData = {
    labels: ['Sueldo', 'Supermercado', 'Ahorros', 'Alquiler', 'Auto', 'Varios'],
    values: [300, 50, 100, 80, 120, 90],
};

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={"Ingresos"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Gastos"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Balance"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Presupuesto"}
          amount={"$173,000"}
          percentage={8}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>

      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr" }}
        gap='24px'>
        <RegistroContable
          title={"Payment Method"}>
        </RegistroContable>
        <Pie data={pieData} title="Distribución de Datos" />
      </Grid>
        
      <Grid
      templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "1fr" }}
      templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
      gap='24px'>

        <Transactions
          title={"Transacciones"}
          date={"27 Nov - 30 Marz"}
          newestTransactions={newestTransactions}
          olderTransactions={olderTransactions}
          />
      </Grid>
    </Flex>
    
  );
}
