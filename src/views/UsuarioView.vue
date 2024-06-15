<template class="body2">
    <section class="body2">
        <div class="container">
            <br><br><br><br><br>
            <div>
                <FormRegistroUsuario />
            </div>
            <br><br><br><br><br><br>
        </div>
    </section>
</template>

<script>


import FormRegistroUsuario from "../components/FormRegistroUsuario.vue"
import { logar } from '@/components/FunctionMongo';

export default {

    components: {
        FormRegistroUsuario
    },

    data() {
        return {
            UnisalesLogo: require("../assets/logo.svg"),
        }
    },

    mounted() {
        this.fazerLogin();
    },

    methods: {
        async fazerLogin() {
            const username = 'viniciugsouto@gmail.com'
            const password = '1sX1d5sTFhpSvJyJ'
            logar(username, password);
        },
    }
}

</script>

<style scoped>
.body2 {
    background-image: url(../assets/backgroundUsuarioView.jpg);
    background-size: cover;
    background-repeat: repeat;
}
</style>