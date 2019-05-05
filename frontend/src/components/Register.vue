<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form @submit.prevent="register">
                    <h1 class="h3 mb-3 font-weight-normal">Registrarse</h1>
                    <div class="form-group">
                        <label for="first_name">Nombre</label>
                        <input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="Introduce nombre">
                    </div>
                    <div class="form-group">
                        <label for="lst_name">Apellido</label>
                        <input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Introduce apellido">
                    </div>
                    <div class="form-group">
                        <label for="email">Correo electronico</label>
                        <input type="email" v-model="email" class="form-control" name="email" placeholder="Introduce un correo electronico">
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" v-model="password" class="form-control" name="email" placeholder="Introduce una contraseña">
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data(){
        return{
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    },
    methods:{
        register(){
            axios.post('/users/register',{
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password
            }).then(res=>{
                this.first_name=''
                this.last_name=''
                this.email=''
                this.password=''
                router.push({name:'Login'})
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>