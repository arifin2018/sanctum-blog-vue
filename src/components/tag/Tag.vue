<template>
    <div class="container">
        <div v-if="isLoading">
            <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40"
                objectbg="#999793" opacity="80" name="dots"></loader>
        </div>
        <template v-for="post in posts">
            <Card :id="post.id" :header="post.title" :text="post.body" :author="post.author" :tags="post.tags"
                :created_at="post.created_at"></Card>
        </template>
    </div>
</template>

<script>
    import Card from '../component/Card.vue'
    export default {
        name: 'SanctumBlogTag',
        components: {
            Card
        },
        data() {
            return {
                posts: []
            };
        },

        computed: {
            async test() {
                try {
                    let token = sessionStorage.getItem("SET_token");
                    this.token = token;
                    let response = await this.axios.get(`api/tag/${this.$route.params.tag}/show`, {
                        headers: {
                            "Authorization": `Bearer ${this.token}`
                        }
                    })
                    this.posts = response.data.data.post.data;
                } catch (error) {
                    if (error.response.data.message = "Unauthenticated.") {
                        this.$store.dispatch('SET_authenticated', false)
                        this.$cookies.remove('SET_authenticated')
                        window.location.reload();
                        this.$router.replace({
                            name: 'auth.login'
                        });
                    }
                } finally {
                    this.isLoading = false;
                }
            }

        },

        mounted() {
            this.test;
        },

        methods: {

        },
    };
</script>

<style lang="scss" scoped>

</style>