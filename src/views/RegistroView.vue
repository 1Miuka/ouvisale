<template>
    <div class="container">
        <Navbar/>
        <FormRegistro/>
    </div>
    
</template>

<script>
import FormRegistro from "../components/FormRegistro.vue"
import Navbar from "../components/Navbar.vue"

export default {
        
    components: {
        FormRegistro,
        Navbar
    }
}

</script>