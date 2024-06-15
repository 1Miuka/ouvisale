<template>
    <div class="container">
      <div class="my-4 text-center">
        <img class="img-fluid" :src="UnisalesLogo" alt="Logo Unisales">
      </div>
      <h1 class="text-center text-info-emphasis mb-4">Painel de Controle Ouvidoria</h1>
      <div class="LinhaVermelha mb-4"></div>
      
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="card border-info">
            <div class="card-body text-center">
              <router-link to="/registro">
                <img class="img-thumbnail mb-3" :src="NovoUsuario" alt="Novo Usuário">
                <h4 class="text-light">Novo Registro</h4>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card border-info">
            <div class="card-body text-center">
              <router-link to="/manifestacao">
                <img class="img-thumbnail mb-3" :src="imgManifestacao" alt="Manifestação">
                <h4 class="text-light">Tratar Manifestações</h4>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card border-info">
            <div class="card-body text-center">
              <router-link to="/dashboard">
                <img class="img-thumbnail mb-3" :src="imgDashboard" alt="Dashboard">
                <h4 class="text-light">Gerar Dashboard</h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        UnisalesLogo: require("../assets/logo.svg"),
        NovoUsuario: require("../assets/NovoUsuario.png"),
        imgManifestacao: require("../assets/imgManifestacao.png"),
        imgDashboard: require("../assets/imgDashboard.png"),
        imgPesquisa: require("../assets/imgPesquisa.png")
      };
    }
  };
  </script>
  
  <style>
  body {
    background-color: #f0f0f0; /* Cor de fundo para o corpo da página */
  }
  
  .LinhaVermelha {
    background-color: red;
    height: 3px;
}
  
  .card {
    background-color: #2284cb; /* Cor de fundo dos cards */
  }
  
  .card-body {
    padding: 2rem; /* Espaçamento interno do corpo do card */
  }
  
  .card-body img {
    max-width: 100%; /* Imagens dentro do card ajustam ao tamanho */
  }
  
  .text-info-emphasis {
    color: #2284cb; /* Cor do título principal */
  }
  
  .text-light {
    color: #fff; /* Cor do texto nos cards */
  }
  </style>
  