<template>
    <section class="body2">
      <div class="container">
        <div>
          <FormRegistroUsuario />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import FormRegistroUsuario from "../components/FormRegistroUsuario.vue";
  import { logar } from "@/components/FunctionMongo";
  
  export default {
    components: {
      FormRegistroUsuario,
    },
  
    mounted() {
      this.fazerLogin();
    },
  
    methods: {
      async fazerLogin() {
        const username = "viniciugsouto@gmail.com";
        const password = "1sX1d5sTFhpSvJyJ";
        logar(username, password);
      },
    },
  };
  </script>
  
  <style scoped>
  .body2 {
    background-image: url(../assets/backgroundUsuarioView.jpg);
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  </style>  