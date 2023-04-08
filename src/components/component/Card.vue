<template>
    <div>
            <div class="card w-100 mb-3">
                <div class="card-header">
                    {{ header }}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ author }}</h5>
                    <p class="card-text">{{ text }}</p>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props:{
            header: String,
            text: String,
            author: String
        },
        data() {
            return {

            };
        },

        mounted() {

        },

        methods: {

        },
        watch:{
            header(val, oldval){
                console.log(val);
                console.log(oldval);
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>