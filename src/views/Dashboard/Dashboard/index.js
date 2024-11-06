// Chakra imports
import {
  Flex,
  Box,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React from "react";
import { dashboardTableData, timelineData } from "variables/general";
import Estadisticas from "./components/Estadisticas";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import WorkWithTheRockets from "./components/WorkWithTheRockets";

import TransactionForm from "./components/transactions/TransactionForm";
import { Balance } from "./components/Balance";
import { Header } from "./components/Header";
import { GlobalProvider } from "context/GlobalState";
import { TransactionList } from "./components/transactions/TransactionList";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { ExpenseChart } from "../../../components/Charts/ExpenseChart";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={"Dinero en cuenta"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Usuarios"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Clientes nuevos"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />

      </SimpleGrid>
      
      <Grid
        templateColumns={{ md: "1fr", lg: "2fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my='26px'
        gap='24px'>
        <BuiltByDevelopers
          title={"Creado por FinanDavinci"}
          name={"Panel de gastos"}
          description={
            "Registra los gastos, proyectos, compras, ventas, pedidos, medios de pago y más de tu empresa"
          }
          image={
            <Image
              src={logoChakra}
              alt='chakra image'
              minWidth={{ md: "300px", lg: "auto" }}
            />
          }
        />

        <WorkWithTheRockets
          backgroundImage={peopleImage}
          title={"Crea grupos de gastos"}
          description={
            "Reorganiza las finanzas de tu proyecto"
          }
        />

      </Grid>

      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb={{ lg: "26px" }}>

          percentage={23}
          //chart={BarChart}
        />

        />
          <GlobalProvider>
            <div className="h-screen flex">
              <div p-10 rounded-lg flex>
                <div>
                  <Header />
                  <ExpenseChart />
                  <Balance />
                  <IncomeExpenses />
                  <TransactionForm />
                </div>
                <TransactionList />
              </div>
            </div>
          </GlobalProvider>

      </Grid>
      
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap='24px'>
        <Projects

      </Grid>
    </Flex>
  );
}
