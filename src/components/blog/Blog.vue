<template>
    <div>
        <div class="container">
            <div v-if="gridSystems.length < 3">
                <template v-for="gridSystem in gridSystems[0]">
                    <div class="row mb-3">
                        <template v-for="gridSystem in gridSystems[1]" :key="gridSystem">
                            <div class="col-sm">
                                <Card header="Arifin" text="Text"></Card>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
            <div v-else>
                <div v-for="gridSystem in (gridSystems[0]-1)">
                    <div class="row mb-3">
                        <template v-for="gridSystem in gridSystems[1]">
                            <div class="col-sm">
                                <Card header="Arifin" text="Text"></Card>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="row mb-3">
                    <template v-for="gridSystem in gridSystems[2]">
                        <div class="col-sm-4">
                            <Card header="Arifin" text="Text"></Card>
                        </div>
                    </template>
                </div>
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
                blog: [
                    {
                        headers: 'arifin',
                        text: 'text'
                    },
                    {
                        headers: 'azriel',
                        text: 'text'
                    },
                    {
                        headers: 'MJ',
                        text: 'text'
                    },
                    {
                        headers: 'pradipta',
                        text: 'text'
                    },
                    {
                        headers: 'rafiq',
                        text: 'text'
                    },
                    {
                        headers: 'khoirunnisa',
                        text: 'text'
                    },
                    {
                        headers: 'miftahul',
                        text: 'text'
                    },
                    {
                        headers: 'jannah',
                        text: 'text'
                    },
                ],
                gridSystem: []
            };
        },

        mounted() {
            console.log(this.gridSystem);
        },

        computed: {
            gridSystems() {
                const BlogLength = this.blog.length;
                
                let columns = this.blog.length / 3;
                let columnsFloor = Math.floor(this.blog.length / 3);
                let rows = Math.ceil(this.blog.length / 3);

                if (columns % 1 == 0) {
                    return [
                        columns,
                        rows
                    ]                    
                }else{
                    return [
                        rows,
                        Math.ceil(columns),
                        columnsFloor
                    ]
                }

            }
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