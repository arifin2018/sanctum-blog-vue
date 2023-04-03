<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <router-link to='/'>Navbar</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <template v-if="!auth">
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ml-auto">
                            <router-link class="nav-item nav-link" to="/">Home</router-link>
                            <router-link class="nav-item nav-link" to="/about">About</router-link>
                            <router-link class="nav-item nav-link" :to="{name: 'auth.login'}">Login</router-link>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="dropdown py-2">
                        <a class="nav-item dropdown-toggle list-unstyled text-decoration-none" href="#" id="navbarDropdown"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ userMe.name }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a @click="logout()" class="dropdown-item btn">Logout</a>
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
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: 'Navigation',
        data() {
            return {
                userMe: [],
                auth: false
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
            }),
            ...mapActions({
                log_out: 'auth/logout',
            }),
        },
        mounted() {
            if (this.$cookies.get('SET_authenticated') != null && localStorage.getItem('SET_user') != null) {
                this.userMe = JSON.parse(localStorage.getItem('SET_user'))
                this.auth = this.$cookies.get('SET_authenticated')
            }
        },
        methods: {
            logout(){
                this.log_out
            } 
        },
        watch:{
            user(val, oldval){
                console.log(val);
                if (val.data) {
                        this.userMe = val.data
                        this.auth = this.$cookies.get('SET_authenticated')
                }else if (this.$cookies.get('SET_authenticated') != null && localStorage.getItem('SET_user') != null) {
                        this.userMe = localStorage.getItem('SET_user')
                        this.auth = this.$cookies.get('SET_authenticated')
                }
                else{
                    this.userMe = [],
                    this.auth = false
                }
                
            }
        }
    }
</script>