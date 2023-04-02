<template>
    <div>
        <form @submit.prevent="authLogin()">
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
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                errors: ''
            }
        },
        methods: {
            async authLogin() {
                try {
                    await this.axios.post('api/login', this.form, {
                        headers: {
                            'Accept': 'application/json',
                        }
                    }).then((response) => {
                        this.$swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    });
                } catch (error) {
                    if (error.response != 'undefined') {
                        if (error.response.data.message == 'The given data was invalid.') {
                            for (const key in error.response.data.errors) {
                                this.errors = `${error.response.data.errors[key]}`;
                                this.$swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: this.errors,
                                    showConfirmButton: false,
                                    timer: 2000
                                })
                            }
                        } else if (error.response.data.message == 'Unauthorized') {
                            this.errors = error.response.data.message;
                            this.$swal.fire({
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
                        this.$swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: this.errors,
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }

                }
            }
        },
    }
</script>