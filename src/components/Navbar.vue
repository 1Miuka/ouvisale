<template>
    <div class="container">
        <div class="row">
            <nav class="navbar NavbarAzul mt-2 rounded">
                <div class="container-fluid">
                    <img class="img-fluid" v-bind:src="UnisalesLogo" />
                    <RouterLink to="/gestao"><button class="navbar-toggler bg-light">
                            <h4 class="bi bi-box-arrow-in-left"></h4>
                        </button></RouterLink>
                </div>
            </nav>
        </div>
    </div>
</template>
    
<script>

export default {
    name: "Navbar",

    data() {
        return {
            UnisalesLogo: require("../assets/logo.svg")
        }
    }
}
</script>

<style scoped>
.NavbarAzul {
    background-color: #1E90FF;
}
</style>