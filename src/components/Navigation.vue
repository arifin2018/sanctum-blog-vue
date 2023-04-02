<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <router-link to='/'>Navbar</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <template v-if="!checkAuth">
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ml-auto">
                            <router-link class="nav-item nav-link" to="/">Home</router-link>
                            <router-link class="nav-item nav-link" to="/about">About</router-link>
                            <router-link class="nav-item nav-link" :to="{name: 'auth.login'}">Login</router-link>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="dropdown">
                        <a class="nav-item dropdown-toggle list-unstyled text-decoration-none" href="#" id="navbarDropdown"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ userMe.data.name }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </template> 
            </div>
        </nav>
    </div>
</template>

<script>
    import {
        mapGetters
    } from "vuex";

    export default {
        name: 'Navigation',
        data() {
            return {
                userMe: []
            }
        },
        computed: {
            ...mapGetters({
                checkAuth: 'auth/check',
                user: 'auth/user'
            })
        },
        watch:{
            user(val, oldval){
                this.userMe = val  
            }
        }
    }
</script>