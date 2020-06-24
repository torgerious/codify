//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

    <script lang="ts">
        "use strict";

        import Vue from "vue";
        import { Component } from 'vue-property-decorator';
        import {Action, Getter, Mutation} from "vuex-class";
        import {actionStringUser, getterStringUser, IUser} from "@/store/users";
        import UserHeader from "@/components/UserHeader.vue";
import { actionStringQuestions, ICourse, getterStringQuestions, mutationStringQuestions } from '../store/questions';
        import MainHeader from "@/components/MainHeader.vue";

//* Component definition ************************************************************

        @Component({
            name: "course_page",
            components: {MainHeader, UserHeader}
        })

//* Class ***************************************************************************

        export default class CoursePage extends Vue {
            @Action(actionStringUser.GET_USER)  getUser: (() => Promise<IUser>);
            @Getter(getterStringUser.user)  user:IUser;
            @Action(actionStringQuestions.getAllCourses) getAllCourses:(() => Promise<ICourse[]>);
            @Getter(getterStringQuestions.courses) courses:ICourse[];

            allCourses:ICourse[] = []; 

            navigate():void{
                this.$router.push('/editor');
            }

            async created():Promise<any>{
              await this.getUser();
              this.allCourses = await this.getAllCourses();


                //Mark completed courses as completed
                this.allCourses.map((course,i) => {
                    const found = this.allCourses.map(title => this.user.completedCourses.includes(title.title))
                    Object.assign(course, {hasCompletedCourse:found[i]});
                })
                  
           
            }
        }


    </script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

    <template>
        <div class="page" v-if="user">
            <main-header></main-header>
            <user-header :user="user"></user-header>

            <p>Leaderboards | TopDonations | request a course </p>
            <h1>Course</h1>
            <div  v-if="allCourses.length > 0" class="page__course--wrapper">
                <div
                    class="page__course--wrapper--card"
                    :class="{'completed': cur.hasCompletedCourse}"
                    v-for="(cur, i) in allCourses" 
                    :key="i"
                    @click="navigate('/editor')">
                    <h2>{{cur.title}}</h2>
                    <p>Build your first website from scratch! We will learn HTML, CSS and javascript on the way!</p>
                    <img src="../assets/developer-gif.gif" alt="icon">

                    <button>Start course</button>
                </div>
                <!-- <div class="page__course--wrapper--card">
                    <h2>Learn HTML</h2>
                </div>
                <div class="page__course--wrapper--card">
                    <h2>Learn CSS</h2>
                </div> -->

            </div>
        </div>
    </template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

    <style scoped lang="scss">

        .completed{
            border-top: 8px solid green;
            box-sizing: border-box;
           
        }

        .page{
            width:100%;
            height: auto;
            &__course--wrapper{
                width:80%;
                height: auto;
                padding: 50px;
                margin: 0 auto;
                &--card{
                    width: 30%;
                    margin: 1.5%;
                    height:auto;
                    display: inline-block;
                    border-radius: 5px;
                    box-shadow: 1px 1px 7px 2px #33333329;
                    img{
                        width: 150px;
                        height: auto;
                        margin:0 auto;
                        display: block;
                    }
                    button{
                        margin:20px 0;
                        padding:5px  15px;
                        border:none;
                        box-shadow: -1px 0px 4px 1px #787b8294;
                        border-radius: 15px;
                        background:none;
                        &:hover{
                            background:#333;
                            color:white;
                            transition: 0.3s;
                            cursor: pointer;
                        }
                    }
                    p{
                        padding:20px 20px 0px 20px;
                    }
                }
            }
        }
    </style>
