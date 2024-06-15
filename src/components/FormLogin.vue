<template>
<section class="vh-100 FundoAzul">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <img class="responsive-img" v-bind:src="UnisalesLogo"/>
            <hr class="my-4">
            <div class="form-outline mb-4">
                <label class="form-label" for="RA">Email</label>
                <input type="text" v-model="username" class="form-control form-control-lg" />
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="Senha">Senha</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>
            <div v-if="mostrarAviso">Login falhou.</div><br>            
            <button class="btn btn-primary btn-lg btn-block" type="submit" @click="fazerLogin">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>

import { logar } from '@/components/FunctionMongo';

export default {
    name: "FormLogin",

    data() {
        return{
            UnisalesLogo: require("../assets/logo.svg"),
            username: "viniciugsouto@gmail.com",
            password: "1sX1d5sTFhpSvJyJ",
            mostrarAviso: false
        }
    },

    methods: {
      async fazerLogin() {
            const username = this.username;
            const password = this.password;

            if (this.username == 'viniciugsouto@gmail.com' && this.password == '1sX1d5sTFhpSvJyJ') {
                logar(username, password);
                this.$router.push('/gestao')
            } else {
                this.mostrarAviso = true;
            }
        },
    }
}

</script>

<style>
    .FundoAzul {
        background-color: #508bfc;
    }
</style>