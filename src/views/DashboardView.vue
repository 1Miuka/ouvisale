<template>
  <div class="container">
    <Navbar />
    <br>
    <div class="border border-2 rounded">
      <br>
      <div class="row">
        <div class="col">
          <h5 class="text-center">Manifestação</h5>
          <br>
        </div>
        <div class="col">
          <h5 class="text-center">Destinatário</h5>
          <br>
        </div>
        <div class="col">
          <h5 class="text-center">Setor</h5>
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <PieChartManifestacaoDoughnut />
        </div>
        <div class="col">
          <PieChartDestinatarioDoughnut />
        </div>
        <div class="col">
          <PieChartSetorDoughnut />
        </div>
      </div>
      <br>
    </div>
  </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue';
import PieChartManifestacaoDoughnut from '../components/PieChartManifestacaoDoughnut.vue';
import PieChartDestinatarioDoughnut from '../components/PieChartDestinatarioDoughnut.vue';
import PieChartSetorDoughnut from '../components/PieChartSetorDoughnut.vue'

export default {
  components: {
    Navbar,
    PieChartManifestacaoDoughnut,
    PieChartDestinatarioDoughnut,
    PieChartSetorDoughnut,
  },
};
</script>