<template>
    <div>
        <div v-if="isLoading">
            <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" disableScrolling="false" name="dots"></loader>
        </div>
        <h1>Post</h1>
    </div>
</template>

<script>
export default {
    name: 'Post',

    data() {
        return {
            posts:[],
            token:'',
            isLoading: false
        };
    },

    mounted() {
        this.getPost();
    },

    methods: {
        async getPost(){
            try {
                this.isLoading = true;
                let token = sessionStorage.getItem("SET_token");
                this.token = token;
                let response = await this.axios.get('api/post', {
                    headers: {
                        "Authorization": `Bearer ${this.token}`
                    }
                })
                this.posts = response.data.data;
            } catch (error) {
                if (error.response.data.message = "Unauthenticated.") {
                    console.log(this.$cookies.remove('SET_authenticated'));
                    this.$store.dispatch('SET_authenticated', false)
                    window.location.reload();
                    this.$router.replace({name: 'auth.login'});
                }
            }finally{
                this.isLoading = false;
            }
        }
    },
};
</script>

<style lang="scss" scoped>

</style>