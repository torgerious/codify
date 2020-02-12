//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

    <script lang="ts">
        "use strict";

        import Vue from "vue";
        import { Component } from 'vue-property-decorator';

//* Component definition ************************************************************

        @Component({
            name: "course_page"
        })

//* Class ***************************************************************************

        export default class CoursePage extends Vue {


            navigate():void{
                this.$router.push('/editor');
            }
        }


    </script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

    <template>
        <div class="page">
            <p>Leaderboards | TopDonations | request a course </p>
            <h1>Course</h1>
            <div class="page__course--wrapper">
                <div class="page__course--wrapper--card" @click="navigate('/editor')">
                    <h2>Learn to code a website</h2>
                </div>
                <div class="page__course--wrapper--card">
                    <h2>Learn HTML</h2>
                </div>
                <div class="page__course--wrapper--card">
                    <h2>Learn CSS</h2>
                </div>

            </div>
        </div>
    </template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

    <style scoped lang="scss">
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
                    height:100px;
                    border:1px solid black;
                    display: inline-block;
                }
            }
        }
    </style>
