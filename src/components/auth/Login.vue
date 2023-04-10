<template>
    <div>
        <form @submit.prevent="authLogin()">
            <div v-if="isLoading">
                <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="dots"></loader>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter email" v-model="form.email ">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                    v-model="form.password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                errors: '',
                user: [],
                isLoading: false
            }
        },
        computed:{
            ...mapGetters({
                Loading: 'auth/isLoading' 
            }),
        },
        methods: {
            ...mapActions({
                login: 'auth/login',
            }),
            async authLogin() {
                try {
                    this.isLoading = this.Loading
                    let response = await this.login(this.form)
                    this.$router.replace({name: 'home'});
                    this.isLoading = this.Loading
                } catch (error) {
                    console.log(error);
                }finally{
                    this.isLoading = false;
                }
            },
        },
    }
</script>