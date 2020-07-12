import {Rank} from "../Types/Rank";
//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

<script lang="ts">
    "use strict";

    import Vue from "vue";
    import {Component} from 'vue-property-decorator';
    import firebase from 'firebase';
    import {Action} from "vuex-class";
    import {actionStringUser, IUser} from "@/store/users";
    import {Rank} from "@/Types/Rank";

    //* Component definition ************************************************************

    @Component({
        name: "register"
    })

//* Class ***************************************************************************

    export default class Register extends Vue {
        email:string = "";
        password:string = "";

        @Action(actionStringUser.POST_USER) postUser:(newUser:Partial<IUser>) => Promise<void>;

        navigate(route:string):void{
            this.$router.push(route)
        }

        async registerNewUser():void{
             firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((res) => {
                console.log(res);
                let userId = res.user.uid;
                let token = res.user.ma;
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', token);

                let newUser:IUser = {
                    name:'',
                    userId:userId,
                    email:this.email,
                    points:0,
                    rank:Rank.RANK_1,
                    completedCourses: [],
                };


                    if(res.additionalUserInfo && res.additionalUserInfo.isNewUser){
                        this.postUser(newUser).then(res => {
                            this.$router.push("/courses");

                        });
                    }



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
    <div class="register">

            <div class="login">
                <button @click="navigate('/')">Login</button>
            </div>



        <input type="email" placeholder="Email" v-model="email" @keyup.enter="$event.target.nextElementSibling.focus()">
        <input type="password" placeholder="Password" v-model="password" @keyup.enter="$event.target.nextElementSibling.focus()">
        <button @click="registerNewUser">Register</button>


    </div>
</template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

<style scoped lang="scss">

    $alien:#76cd9c;
    $gray:#b0adad;


    .register{
        height: auto;
        min-height: 100vh;
        width:100%;
        background:white;
        display: inline-block;
        text-align: left;

}




</style>
