<template>
    <canvas ref="destinatarioChart"></canvas>
</template>
  
<script>
import Chart from 'chart.js/auto';
import { findMongo } from './FunctionMongo';

export default {
    data() {
        return {
            arrayMongo: [],
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Quantidade por Destinatário',
                    data: [],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            },
        };
    },

    mounted() {
        this.DestinatarioData();
    },


    methods: {
        async DestinatarioData() {
            try {
                const data = await findMongo();
                this.arrayMongo = data.documents;
                console.log(this.arrayMongo);

                // Processar os dados para o formato necessário do gráfico
                const destinatarioMap = {};

                this.arrayMongo.forEach((item) => {
                    const destinatario = item.Destinatário;

                    if (destinatario in destinatarioMap) {
                        destinatarioMap[destinatario]++;
                    } else {
                        destinatarioMap[destinatario] = 1;
                    }
                });

                this.chartData.labels = Object.keys(destinatarioMap);
                this.chartData.datasets[0].data = Object.values(destinatarioMap);

                // Renderizar o gráfico
                this.renderChart();
            } catch (error) {
                console.error('Erro ao buscar dados de manifestações:', error);
            }
        },

        renderChart() {
            const ctx = this.$refs.destinatarioChart.getContext('2d');
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