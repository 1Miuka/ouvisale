<template>
    <div class="container">
        <Navbar />
        <br>
        <div>
            <div class="row">
                <div class="col">
                    <h3 class="text-center">Manifestações</h3>
                </div>
                <div class="col-sm-3">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Pesquisar"
                            aria-label="Pesquisar">
                    </form>
                </div>
            </div>
            <br>
            <div v-if="arrayMongo && arrayMongo.length > 0">
                <table class="table table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Selecionar</th>
                            <th scope="col">Tipo de Manifestação</th>
                            <th scope="col">Nome do Estudante</th>
                            <th scope="col">Usuário</th>
                            <th scope="col">Setor</th>
                            <th scope="col">Destinatário</th>
                            <th scope="col">Status</th>
                            <th scope="col">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in arrayMongo" :key="item._id" @click="selecionarItem(item, $event)"
                            style="cursor: pointer;">
                            <td>{{ index + 1 }}</td>
                            <td><input type="checkbox" v-model="item.selecionado"></td>
                            <td>{{ item.Manifestação }}</td>
                            <td>{{ item.Nome }}</td>
                            <td>{{ item.Usuario }}</td>
                            <td>{{ item.Setor }}</td>
                            <td>{{ item.Destinatário }}</td>
                            <td>{{ item.Status }}</td>
                            <td>{{ item.Data }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn btn-success" @click="gerarPDF">Gerar PDF</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-success" @click="gerarExcel">Gerar Excel</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <detalhes-modal v-if="mostrarModal" :modalItem="itemSelecionado" @fechar="fecharModal" />
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import DetalhesModal from "../components/DetalhesModal.vue";
import { findMongo } from "@/components/FunctionMongo";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export default {
    components: {
        Navbar,
        DetalhesModal
    },

    data() {
        return {
            arrayMongo: [],
            mostrarModal: false,
            itemSelecionado: null
        };
    },

    mounted() {
        this.procurar();
    },

    methods: {
        async procurar() {
            try {
                const data = await findMongo();
                // Mapeamos os documentos para adicionar a propriedade 'selecionado' se não existir
                this.arrayMongo = data.documents.map(item => ({
                    ...item,
                    selecionado: item.selecionado || false // Garante que 'selecionado' seja inicializado como false se não estiver presente
                }));
            } catch (error) {
                console.error("Erro ao buscar manifestações:", error);
            }
        },

        selecionarItem(item, event) {
            // Verifica se o clique foi diretamente na célula da tabela, excluindo a caixa de seleção
            if (!event.target.closest('input[type="checkbox"]')) {
                this.itemSelecionado = item;
                this.mostrarModal = true;
            }
        },

        fecharModal() {
            this.mostrarModal = false;
        },

        gerarPDF() {
            const itensSelecionados = this.arrayMongo.filter(item => item.selecionado);
            if (itensSelecionados.length === 0) {
                alert("Selecione pelo menos um item para gerar o PDF.");
                return;
            }

            // Criando um novo documento PDF
            const doc = new jsPDF();

            // Título do documento
            doc.setFontSize(20);
            doc.text("Relatório de Manifestações", 15, 15);

            // Conteúdo do documento
            doc.setFontSize(12);
            let linha = 1;
            itensSelecionados.forEach(item => {
                doc.text(`Manifestação: ${item.Manifestação}`, 15, 30 + linha * 10);
                doc.text(`Nome do Estudante: ${item.Nome}`, 15, 40 + linha * 10);
                doc.text(`Usuário: ${item.Usuario}`, 15, 50 + linha * 10);
                doc.text(`Setor: ${item.Setor}`, 15, 60 + linha * 10);
                doc.text(`Destinatário: ${item.Destinatário}`, 15, 70 + linha * 10);
                doc.text(`Data: ${this.item.Data}`, 15, 80 + linha * 10);
                linha += 7; // Aumenta o espaço entre os itens
            });

            // Salvando o documento
            doc.save('relatorio_manifestacoes.pdf');
        },


        gerarExcel() {
            const itensSelecionados = this.arrayMongo.filter(item => item.selecionado);
            if (itensSelecionados.length === 0) {
                alert("Selecione pelo menos um item para gerar o Excel.");
                return;
            }

            // Preparando os dados para o Excel
            const data = itensSelecionados.map(item => ({
                "Tipo de Manifestação": item.Manifestação,
                "Nome do Estudante": item.Nome,
                "Usuário": item.Usuario,
                "Setor": item.Setor,
                "Destinatário": item.Destinatário,
                "Data": this.item.Data
            }));

            // Criando uma nova planilha do Excel
            const worksheet = XLSX.utils.json_to_sheet(data);

            // Criando um novo livro do Excel e adicionando a planilha
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Manifestações");

            // Salvando o arquivo Excel
            XLSX.writeFile(workbook, "manifestacoes.xlsx");
        }
    }
};
</script>