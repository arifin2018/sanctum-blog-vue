<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div v-if="isLoading">
                <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="dots"></loader>
            </div>
            <div class="container">
                <router-link :to='{name:"home"}'>Navbar</router-link>
                <template v-if="!auth">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ml-auto">
                            <router-link class="nav-item nav-link" to="/">Home</router-link>
                            <router-link class="nav-item nav-link" to="/about">About</router-link>
                            <router-link class="nav-item nav-link" :to="{name: 'blog'}">Blog</router-link>
                            <router-link class="nav-item nav-link" :to="{name: 'post.index'}">Post</router-link>
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
                            <router-link class="dropdown-item btn" :to="{name: 'about'}">About</router-link>
                            <router-link class="dropdown-item btn" :to="{name: 'post.index'}">Post</router-link>
                            <router-link class="dropdown-item btn" :to="{name: 'blog'}">Blog</router-link>
                            <form @submit.prevent="authLogout()">
                                <button class="dropdown-item btn">Logout</button>
                            </form>
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
                auth: false,
                isLoading: false
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                Loading: 'auth/isLoading' 
            }),
        },
        mounted() {
            if (this.$cookies.get('SET_authenticated') != null && localStorage.getItem('SET_user') != null) {
                this.userMe = JSON.parse(localStorage.getItem('SET_user'))
                this.auth = this.$cookies.get('SET_authenticated')
            }
        },
        methods: {
            ...mapActions({
                logout: 'auth/logout',
            }),
            async authLogout(){
                try {
                    this.Loading;
                    await this.logout();
                    this.$router.replace({name: 'auth.login'});
                } catch (error) {
                    console.log('error.logout');
                    console.log(error);
                }
                
            } 
        },
        watch:{
            user(val, oldval){
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
                
            },
            Loading(val,oldval){
                this.isLoading = val;
                console.log('Loading');
                console.log(val);
            }
        }
    }
</script>