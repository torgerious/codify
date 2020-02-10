//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

    <script lang="ts">
        "use strict";

        import Vue from "vue";
        import { Component } from 'vue-property-decorator';

//* Component definition ************************************************************

        @Component({
            name: "html-course"
        })

//* Class ***************************************************************************

        export default class HtmlCourse extends Vue {
            currentStep:number = 0;

            nextStep():void{
                this.currentStep = this.currentStep +1;
            }
            prevStep():void{
                this.currentStep = this.currentStep -1;
            }
        }

    </script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

    <template>
        <div class="description">
            <div class="description--action">
                <button @click="nextStep()">Next</button>
                <button @click="prevStep()">Prev</button>

            </div>
            <div class="description--step" v-if="currentStep === 1">
                <h1>Complete Webdevelopment</h1>
                <p>Welcome to the webdevelopment course.</p>
                <p>In this course we will go through the basics of webdevelopment and build a complete website from start to finish</p>
                <h2>What to expect from the course</h2>
                <p>When you have completed this course you should be qualified to start experimenting with code on your own and create basic static websites.</p>
                <p>This course will give you the tools, but you will have to take your knowledge beyond this course and experiment by yourself.</p>
                <p>Alright, lets get started!</p>
            </div>
            <div class="description--step" v-if="currentStep === 2">
                <h1>Website basic concepts</h1>
                <p>A website is basically a folder containing a lot of text files. And the URL is just a way to open those text files through the web. </p>
                <p>Those text files is called HTML (Hyper text markup language) and is what we are going to start to learn first.</p>
                <p>HTML is what we call a markup language and is responsible for how we structure our Text, images, and input fields etc.</p>
                <p>Then we have a language called CSS (Cascading Style Sheets). CSS is responsible for how we style our HTML by changing
                text color, size, and placement of HTML elements.</p>
                <p>HTML and CSS is usually what every modern website on the web is using.</p>


            </div>
        </div>
    </template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

    <style scoped lang="scss">
        .description{
            width:500px;
            height: 550px;
            &--action{
                height: 50px;
                width: 100%;
                background: #2d3451;
            }
            &--step{
                height: 500px;
                width: 100%;
                float: left;
                text-align: left;
                background: #fbfbfb;
            }
        }

    </style>
