import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2'

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: [],
        token: ''
    },
    getters: {
        check(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        token(state){
            return state.token
        }
    },
    mutations: {
        SET_authenticated(state, value) {
            state.authenticated = value
        },
        SET_user(state, value) {
            state.user = value
        },
        SET_token(state,value){
            state.token = value
        }
    },
    actions: {
        async login({commit, dispatch}, credentials) {
            try {
                await axios.post('api/login', credentials, {
                    headers: {
                        'Accept': 'application/json',
                    }
                }).then((response) => {
                    commit('SET_token', response.data.access_token)
                    dispatch('me')
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    })
                });
            } 
            catch (error) {
                if (error.response != 'undefined') {
                    if (error.response.data.message == 'The given data was invalid.') {
                        for (const key in error.response.data.errors) {
                            this.errors = `${error.response.data.errors[key]}`;
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: this.errors,
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    } else if (error.response.data.message == 'Unauthorized') {
                        this.errors = error.response.data.message;
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: this.errors,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    } else {
                        console.log(error);
                        this.errors = "there's something wrong";
                        this.$swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: this.errors,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                } else {
                    this.errors = "there's something wrong";
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: this.errors,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }

            }
        },

        async me({commit,getters}) {
            try {
                let response = await axios.get('api/user',{
                    headers : {
                        "Authorization" : `Bearer ${getters.token}`} 
                })
                commit('SET_authenticated', true),
                commit('SET_user', response)
            } catch (error) {
                commit('SET_authenticated', false),
                commit('SET_user', [])
            }
        },
    },
}