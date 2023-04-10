<template>
    <div>
        <div class="card w-100 mb-3">
            <div class="card-header">
                {{ header.length > 33 ? header.substring(0, 33) + '...' : header.substring(0, 33) }}
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ author }}<span class="text-muted author"> (Author)</span></h5>
                <p class="card-text">
                    {{ text.length > 100 ? text.substring(0, 100) + '...' : text }}
                </p>

                <div class="w-100">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal"
                        :data-target="'#exampleModalCenter-'+ id">
                        Detail more...
                    </button>
                </div>

                <!-- Modal -->
                <div class="modal fade" :id="'exampleModalCenter-'+id" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">{{ header }}</h5>
                                <h6 class="modal-subtitle text-secondary">{{ created_at }}</h6>
                            </div>
                            <div class="modal-body">
                                {{ text }}
                                <div class="d-flex">
                                    <span v-for="tag in tags" class="badge badge-secondary" :style="{'color':tag.color}">
                                        <a :href="'/tag/' + tag.name">{{ tag.name }}</a>
                                    </span>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            id: Number,
            header: String,
            text: String,
            author: String,
            tags: Array,
            created_at: String
        },
        data() {
            return {

            };
        },

        mounted() {

        },

        methods: {

        },
        watch: {
            id(val, oldval) {
                console.log(val);
                console.log(oldval);
            }
        }
    };
</script>

<style lang="scss" scoped>
    span {
        &.author {
            font-size: 13px;
        }
    }

    div {
        span {
            &.badge {
                position: relative;
                margin: 0.4em 0.2rem;
            }
        }
    }

    .modal-header{
        .modal-subtitle{
            min-width: 6rem;
        }
    }

    a{
        color: inherit;
        text-decoration: inherit;
    }
</style>