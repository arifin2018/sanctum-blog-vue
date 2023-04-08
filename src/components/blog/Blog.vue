<template>
    <div>
        <div v-if="isLoading">
            <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" disableScrolling="false" name="dots"></loader>
        </div>
        <div class="container">
                <div class="row mb-3">
                    <template v-for="blog in blogs">
                        <div class="col-sm-4">
                            <Card :header="blog.title.length > 33 ? blog.title.substring(0, 33) + '...' : blog.title.substring(0, 33)" :text="blog.body" :author="blog.author"></Card>
                        </div>
                    </template>
                </div>
        </div>
    </div>
</template>

<script>
    // import Card from '../component/Card.vue'
    import Card from '../component/Card.vue'

    export default {
        name: 'SanctumBlogBlog',
        data() {
            return {
                blogs:[],
                isLoading: false
            };
        },

        mounted() {
            this.getPost;
        },

        computed: {
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
                    this.blogs = response.data.data;
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
            },
        },

        methods: {
        },

        components: {
            Card
        }
    };
</script>

<style lang="scss" scoped>

</style>