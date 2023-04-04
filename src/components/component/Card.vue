<template>
    <div>
        <div class="card">
            <div class="card-header">
                {{ header }}
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
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
            text: String
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