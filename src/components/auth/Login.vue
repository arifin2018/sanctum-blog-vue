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
                // this.axios.post('http://127.0.0.1:8000/api/arifin').then(function(response){
                //     console.log(response.data.message);
                // });
                try {
                    await this.axios.post('http://127.0.0.1:8000/api/login', this.form, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(function (response) {
                        console.log(response);
                    });
                } catch (error) {
                    if (error.response.data.message == 'The given data was invalid.') {
                        for (const key in error.response.data.errors) {
                            this.errors = `${error.response.data.errors[key]}`;
                        }
                    }
                    // console.log(error.response.data.message);
                }
            }
        },
    }
</script>