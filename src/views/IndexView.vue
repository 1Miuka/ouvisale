<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2 text-center">
                <h1 class="mb-4">Página Inicial da VPS</h1>
                <img src="@/assets/ilululego.png" alt="Logo" class="img-fluid mb-4" style="max-width: 300px;">
                <p class="lead mb-4">Trabalho - Vito [Catinder]</p>
                <a :href="linkCatinder" target="_blank" class="btn btn-primary btn-lg">Ir para o site Catinder</a>

                <p class="lead mb-4">Trabalho - ProjetoIntegrador [Gestora - OUVISALE]</p>
                <a :href="linkGestora" target="_blank" class="btn btn-primary btn-lg">Ir para o site Gestora</a>

                <p class="lead mb-4">Trabalho - ProjetoIntegrador [Usuario - OUVISALE]</p>
                <a :href="linkUsuario" target="_blank" class="btn btn-primary btn-lg">Ir para o site Usuario</a>

                <p class="lead mb-4">Trabalho - VPS [Jenkins]</p>
                <a :href="linkJenkins" target="_blank" class="btn btn-primary btn-lg">Ir para o site Jenkins</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            linkCatinder: "http://177.153.50.48:8080/",
            linkGestora: "http://177.153.50.48/login",
            linkUsuario: "http://177.153.50.48/usuario",
            linkJenkins: "http://177.153.50.48:8082/"
        };
    }
};
</script>