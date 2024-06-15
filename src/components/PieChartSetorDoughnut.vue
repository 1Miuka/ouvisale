<template>
    <canvas ref="setorChart"></canvas>
</template>
  
<script>
import Chart from 'chart.js/auto';
import { findMongo } from '../components/FunctionMongo';

export default {
    name: "PieChartSetorDoughnut",

    data() {
        return {
            arrayMongo: [],
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Setor',
                        data: [],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    },
                ],
            },
        };
    },

    mounted() {
        this.fetchSetorData();
    },


    methods: {
        async fetchSetorData() {
            try {
                const data = await findMongo();
                this.arrayMongo = data.documents;
                console.log(this.arrayMongo);

                // Processar os dados para o formato necessário do gráfico
                const setorMap = {};

                this.arrayMongo.forEach((item) => {
                    const setor = item.Setor;

                    if (setor in setorMap) {
                        setorMap[setor]++;
                    } else {
                        setorMap[setor] = 1;
                    }
                });

                this.chartData.labels = Object.keys(setorMap);
                this.chartData.datasets[0].data = Object.values(setorMap);

                // Renderizar o gráfico
                this.renderChart();
            } catch (error) {
                console.error('Erro ao buscar dados de manifestações:', error);
            }
        },

        renderChart() {
            const ctx = this.$refs.setorChart.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: this.chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        },
    },
}
</script>
  