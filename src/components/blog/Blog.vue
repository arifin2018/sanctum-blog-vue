<template>
    <section class="content">
        <div class="container">
            <div v-if="isLoading">
                <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40"
                    objectbg="#999793" opacity="80" name="dots"></loader>
            </div>
            <div class="row mb-3">
                <template v-for="blog in blogs">
                    <div class="col-sm-4 bottom-last">
                        <Card :id="blog.id" :header="blog.title" :text="blog.body" :author="blog.author"
                            :tags="blog.tags" :created_at="blog.created_at"></Card>
                    </div>
                </template>
            </div>
            <template v-if="blogs.length < blogTotal ">
                <button @click="LoadMore()" class="mb-5">Load more...</button>
            </template>
        </div>
    </section>
</template>

<script>
    import Card from '../component/Card.vue'

    export default {
        name: 'SanctumBlogBlog',
        data() {
            return {
                blogs: [],
                isLoading: true,
                perPages: 1,
                blogTotal: 0
            };
        },

        mounted() {
            this.getPost();
            // document.getElementsByTagName('footer')[0].classList.remove('position-fixed');
        },

        computed: {
            
        },

        methods: {
            LoadMore() {
                this.perPages += 3;
                sessionStorage.setItem('this.perPages', this.perPages);
                this.getPost();
            },
            async getPost() {
                try {
                    this.isLoading = true;
                    let token = sessionStorage.getItem("SET_token");
                    let perPagesSession = sessionStorage.getItem('this.perPages');
                    this.token = token;
                    let response = await this.axios.get('api/post', {
                        params: {
                            pages: Boolean(perPagesSession) ? perPagesSession : this.perPages 
                        },
                        headers: {
                            "Authorization": `Bearer ${this.token}`
                        }
                    })
                    this.blogs = response.data.data;
                    this.blogTotal = response.data.meta.total;
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
            },
        },

        components: {
            Card
        }
    };
</script>

<style lang="scss" scoped>
    .content {
        height: 100vh;
    }

    .bottom-last:last-child{
        margin-bottom: 2.5rem;
    }
</style>