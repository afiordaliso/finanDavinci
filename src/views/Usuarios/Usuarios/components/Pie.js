// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Text, Box } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: !!title,
                text: title,
            },
        },
    };

    return (
        <Card p="16px" mt="16px" borderRadius="15px">
            <CardBody>
                <Text fontSize="xl" fontWeight="bold" mb="16px" textAlign="center">
                    {title}
                </Text>
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <Pie data={chartData} options={options} />
                </Box>
            </CardBody>
        </Card>
    );
};

export default PieChart;
