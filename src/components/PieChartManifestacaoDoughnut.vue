<template>
    <canvas ref="manifestacaoChart"></canvas>
</template>
  
<script>
import Chart from 'chart.js/auto';
import { findMongo } from './FunctionMongo';

export default {
    name: "PieChartManifestacaoDoughnut",

    data() {
        return {
            arrayMongo: [],
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Manifestação',
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
        this.fetchManifestacoesData();
    },


    methods: {
        async fetchManifestacoesData() {
            try {
                const data = await findMongo();
                this.arrayMongo = data.documents;
                console.log(this.arrayMongo);

                // Processar os dados para o formato necessário do gráfico
                const manifestacoesMap = {};

                this.arrayMongo.forEach((item) => {
                    const manifestacao = item.Manifestação;

                    if (manifestacao in manifestacoesMap) {
                        manifestacoesMap[manifestacao]++;
                    } else {
                        manifestacoesMap[manifestacao] = 1;
                    }
                });

                this.chartData.labels = Object.keys(manifestacoesMap);
                this.chartData.datasets[0].data = Object.values(manifestacoesMap);

                // Renderizar o gráfico
                this.renderChart();
            } catch (error) {
                console.error('Erro ao buscar dados de manifestações:', error);
            }
        },

        renderChart() {
            const ctx = this.$refs.manifestacaoChart.getContext('2d');
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
  