<template>
    <div class="container mt-3">
        <div class="card mx-auto p-4 bg-light">
            <div class="card-body bg-light">
                <form @submit.prevent="enviar2">
                    <div class="mb-3">
                        <label for="selectedManifestacao" class="form-label">Tipo de manifestação</label>
                        <select class="form-select" id="selectedManifestacao" v-model="selectedManifestacao" required>
                            <option value="">Selecione...</option>
                            <option>Elogio</option>
                            <option>Sugestão</option>
                            <option>Dúvida</option>
                            <option>Reclamação</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" placeholder="Nome:" v-model="nome" required>
                    </div>

                    <div class="mb-3">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input type="tel" class="form-control" id="telefone" placeholder="Telefone:" v-model="telefone"
                            required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Email:" v-model="email"
                            required>
                    </div>

                    <div class="mb-3">
                        <label for="selectedUsuario" class="form-label">Selecione o Usuario</label>
                        <select class="form-select" id="selectedUsuario" v-model="selectedUsuario" required>
                            <option value="">Selecione...</option>
                            <option>Aluno</option>
                            <option>Egresso</option>
                            <option>Docente</option>
                            <option>Colaborador</option>
                            <option>Visitante</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="selectedSetor" class="form-label">Selecione o setor</label>
                        <select class="form-select" id="selectedSetor" v-model="selectedSetor"
                            @change="atualizarDestinatarios" required>
                            <option value="">Selecione...</option>
                            <option>Docente</option>
                            <option>Multiatendimento</option>
                            <option>Coordenação</option>
                            <option>Copiadora</option>
                            <option>Recepção</option>
                            <option>Cantina</option>
                            <option>Copinha</option>
                            <option>EstruturaFísica</option>
                        </select>
                    </div>

                    <div class="mb-3" v-if="mostrarDestinatario">
                        <label for="selectedDestinatario" class="form-label">Selecione o destinatário</label>
                        <select class="form-select" id="selectedDestinatario" v-model="selectedDestinatario" required>
                            <option value="">Selecione...</option>
                            <option v-for="destinatario in destinatarios" :key="destinatario">{{ destinatario }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="registro" class="form-label">Descrição do registro</label>
                        <textarea class="form-control" id="registro" rows="5" v-model="registro" required></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-lg btn-block">Enviar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { enviarMongo } from '@/components/FunctionMongo';

export default {
    name: "FormRegistroUsuario",
    data() {
        return {
            selectedManifestacao: "",
            nome: "",
            telefone: "",
            email: "",
            selectedUsuario: "",
            selectedSetor: "",
            selectedDestinatario: "",
            registro: "",
            setores: {
                Docente: ["Vinícius", "Glaucia", "Gabriel"],
                Coordenação: ["Tecnologia da Informação", "Administração", "Arquitetura", "Psicologia", "Nutrição", "Filosofia", "Engenharia", "Enfermagem"],
                EstruturaFísica: ["Sala", "Laboratorio"],
                Multiatendimento: [],
                Copiadora: [],
                Recepção: [],
                Cantina: [],
                Copinha: []
            },
            destinatarios: [],
            mostrarDestinatario: true
        };
    },
    methods: {
        enviar2() {
            if (
                !this.selectedManifestacao ||
                !this.nome ||
                !this.telefone ||
                !this.email ||
                !this.selectedUsuario ||
                !this.selectedSetor ||
                (this.requiresDestinatario() && !this.selectedDestinatario) || // Adiciona a condição para verificar
                !this.registro
            ) {
                alert("Por favor, preencha todos os campos antes de enviar.");
                return;
            }

            enviarMongo(
                this.selectedManifestacao,
                this.nome,
                this.telefone,
                this.email,
                this.selectedUsuario,
                this.selectedSetor,
                this.selectedDestinatario,
                this.registro
            );

            alert("Registrado com sucesso!");
            this.limparCampos();
        },
        limparCampos() {
            this.selectedManifestacao = "";
            this.nome = "";
            this.telefone = "";
            this.email = "";
            this.selectedUsuario = "";
            this.selectedSetor = "";
            this.selectedDestinatario = "";
            this.registro = "";
            this.mostrarDestinatario = true;
        },
        atualizarDestinatarios() {
            if (this.selectedSetor === "Multiatendimento" ||
                this.selectedSetor === "Copiadora" ||
                this.selectedSetor === "Recepção" ||
                this.selectedSetor === "Cantina" ||
                this.selectedSetor === "Copinha") {
                this.mostrarDestinatario = false;
                this.selectedDestinatario = ""; // Reseta o destinatário selecionado quando setores sem destinatário são escolhidos
            } else {
                this.mostrarDestinatario = true;
                if (this.setores[this.selectedSetor]) {
                    this.destinatarios = this.setores[this.selectedSetor];
                } else {
                    this.destinatarios = [];
                }
            }
        },
        // Adiciona um método para verificar se o setor selecionado exige um destinatário
        requiresDestinatario() {
            const setoresSemDestinatario = [
                "Multiatendimento",
                "Copiadora",
                "Recepção",
                "Cantina",
                "Copinha"
            ];
            return !setoresSemDestinatario.includes(this.selectedSetor);
        }
    }
};
</script>