import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from "context/GlobalState";
import { BsPieChartFill } from "react-icons/bs";
import {
  Flex,
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";

export function ExpenseChart() {
  const { transactions } = useGlobalState();

  const totalIncomes = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => (acc += transaction.amount), 0) * -1;

  console.log({
    totalIncomes,
    totalExpenses,
  });

  const expensesPercentage = Math.round((totalExpenses / totalIncomes) * 100);
  const incomesPercentage = 100 - (expensesPercentage);

  if (totalIncomes === 0 && totalExpenses === 0) {
    return (
      <Box bg="gray.900" p={4} my={2}>
        <Flex
          h="full"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          w="full"
        >
          <Icon as={BsPieChartFill} boxSize="36" /> {/* Ajusta el tamaño del ícono */}
          <Text fontSize="3xl" fontWeight="bold" my={2}>No data yet</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <div className="bg-zinc-950">
      <VictoryPie
        colorScale={["#e74c3c", "#2ecc71"]}
        data={[
          { x: "Expenses", y: expensesPercentage },
          { x: "Incomes", y: incomesPercentage },
        ]}
        animate={{
          duration: 2000,
        }}
        labels={({ datum }) => datum.y}
        labelComponent={
          <VictoryLabel
            angle={45}
            style={{
              fill: "white",
            }}
          />
        }
      />
    </div>
  );
}