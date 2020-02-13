//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

<script lang="ts">
    "use strict";

    import Vue from "vue";
    import { Component } from 'vue-property-decorator';
    import  firebase from 'firebase';

    //* Component definition ************************************************************

    @Component({
        name: "login"
    })

//* Class ***************************************************************************

    export default class Login extends Vue {
        email:string = '';
        password:string = '';

        navigate(route:string):void{
            this.$router.push(route)
        }

        login():void{
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( res => {
                let userId = res.user.uid;
                let token = res.user.ma;
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', token);

                this.$router.push('/courses');
            }).catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(error);
                alert(errorMessage);

                // ...
            });
        }



    }

</script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

<template>
    <div class="login">
            <div class="login">
                <button @click="navigate('/register')">Register</button>
            </div>

                <input type="email" placeholder="Email" v-model="email" @keyup.enter="$event.target.nextElementSibling.focus()">
                <input type="password" placeholder="Password" v-model="password" @keyup.enter="$event.target.nextElementSibling.focus()">
                <button @click="login">Login</button>

    </div>
</template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

<style scoped lang="scss">


</style>
