<template>
    <div class="q-pa-md">
      <h1>Login</h1>
      <input type="text" v-model="username1" />
      <input type="password" v-model="password1" />
      <button @click="fazerLogin">Logar</button>
    </div>

    <div v-if="mostrarAviso" class="aviso">
      Login falhou. Verifique suas credenciais.
    </div>
  
    <div>
      <h2>Teste Enviar ( Funciona)</h2>
      <input type="text" v-model="Nome" />
      <input type="password" v-model="RA" />
      <button @click="enviar2">Aqui-Teste</button>
    </div>
  
    <div>
      <h5>Teste Find</h5>
      <button @click="procurar1">Teste-Find</button>
      
      <div v-if="MongoItem.documents && MongoItem.documents.length > 0">
        <table>
          <thead>
            <tr>
              <th>Contando</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(objetoMongo, index) in MongoItem.documents" :key="objetoMongo._id" @click="selecionarItem(objetoMongo)">
              <td>{{ index + 1 }}</td>
              <td>{{ objetoMongo._id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
        <h5>Teste de selecionar</h5>
        <input type="text" v-model="selecionadoID">
        <input type="text" v-model="selecionadoNome">
        <button @click="deletaMongo">DeletaMongo</button>
    </div>

    <span>{{ MongoItem }}</span>

  </template>
     
  <script>

  import { findMongo, logar, enviarMongo } from '@/components/FunctionMongo';


  export default {
    data() {
      return {
        username1: "viniciugsouto@gmail.com",
        password1: "1sX1d5sTFhpSvJyJ",
        Nome: "",
        RA: "",
        mostrarAviso: false,
        selecionadoID: "",
        selecionadoNome: "",
        itemSelecionado: null,
        MongoItem: []
      };
    },
  
    methods: {
        selecionarItem(objetoMongo) {
            this.selecionadoID = objetoMongo._id
            this.selecionadoNome = objetoMongo.nome
            this.selecionadoNome = objetoMongo.RA
            this.itemSelecionado = objetoMongo
        },

        async fazerLogin() {
            const username = this.username1;
            const password = this.password1;

            if (this.username1 == 'viniciugsouto@gmail.com' && this.password1 == '1sX1d5sTFhpSvJyJ') {
                logar(username, password);
            } else {
                this.mostrarAviso = true;
            }
        },


        deletaMongo() {
        fetch("https://sa-east-1.aws.data.mongodb-api.com/app/data-dxiqe/endpoint/data/v1/action/deleteOne", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "collection": "cliente",
                "database": "lucasTrabalho",
                "dataSource": "ProjetoUNI",
                "filter": {
                    "_id": { "$oid": this.itemSelecionado._id}
                }
            })
        })
        .then(() => {
            // Após a exclusão, você pode querer limpar os campos e recarregar os dados
            this.inputNome = "";
            this.inputId = "";
            this.procurar(); // Recarrega os dados
        })
    },

      procurar() {
        fetch("https://sa-east-1.aws.data.mongodb-api.com/app/data-dxiqe/endpoint/data/v1/action/find", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({
            "collection": "cliente",
            "database": "lucasTrabalho",
            "dataSource": "ProjetoUNI",
            "projection": {}
          })
        })
        .then(response => response.json())
        .then(data => {
          this.MongoItem = data;
          console.log(this.MongoItem)
        })
        .catch(error => {
          console.error('Erro ao obter dados do MongoDB:', error);
        });
      },

      enviar2() {
        const nome = this.Nome
        const ra = this.RA

        enviarMongo(nome, ra)
      },
      
      async procurar1() {
        const data = await findMongo();
        this.MongoItem = data;
        console.log(this.MongoItem);
      },

    }
  };

  </script>
  