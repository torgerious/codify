<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import VueResizable from 'vue-resizable'
    import { codemirror } from "vue-codemirror"
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/htmlembedded/htmlembedded.js'

    // theme css
    import 'codemirror/theme/material-palenight.css'
    import HtmlCourse from "@/views/tutorials/webdevelopment/html/HtmlCourse.vue";
    import ProgressBar from "@/components/ProgressBar.vue";

    @Component({
        name: 'editor',
        components: {
            ProgressBar,
            HtmlCourse,
            codemirror,
            VueResizable
        }
    })
    export default class Editor extends Vue {

        @Prop({default:''}) correctAnswer: string | undefined;
        @Prop({default:'text/html'}) language:string | undefined;

        course = {
            questions : [
                {
                    text: '<h1>Complete Webdevelopment</h1><p>Welcome to the webdevelopment course.</p><p>In this course we will go through the basics of webdevelopment and build a complete website from start to finish</p>\<h2>What to expect from the course</h2>\<p>When you have completed this course you should be qualified to start experimenting with code on your own and create basic static websites.</p>\<p>This course will give you the tools, but you will have to take your knowledge beyond this course and experiment by yourself.</p>\<p>Alright, lets get started!</p>',
                    hasCodeChallenge: false,
                    answer: '<p>Hello world</p>',
                    language:'html',
                    startCode: ''
                },
                {
                    text: '<h1>Website basic concepts</h1><p>A website is basically a folder containing a lot of text files. And the URL is just a way to open those text files through the web.<p>Those text files is called HTML (Hyper text markup language) and is what we are going to start to learn first<p>HTML is what we call a markup language and is responsible for how we structure our Text, images, and input fields etc<p>Then we have a language called CSS (Cascading Style Sheets). CSS is responsible for how we style our HTML by chatext color, size, and placement of HTML elements<p>HTML and CSS is usually what every modern website on the web is using.</p>',
                    hasCodeChallenge: false,
                    answer: '<p>Hello world</p>',
                    language:'html',
                    startCode: ''
                },
                {
                    text: '<h1>The HTML Paragraph tag</h1> <p>Lets begin writing some HTML code. There is a code editor to the right. You will use this editor throughout the course. When you think you have enteredthe correct code for the current step. Hit the buttton \'Run code\' to see if it is correct.</p> <p>We will begin with the HTML Paragraph tag. This is how you write text on a website. Everything between the "&lt;p&gt; &lt;p&gt;" will be rendered as text on the web</p>' +
                        ' <p class="instructions">1. Write the following code and hit the \'Run Code\' button' +
                        '<span class="tag">&lt;p&gt; <span class="tag-text">Hello world</span> &lt;/p&gt;</span></p> <br>',
                    hasCodeChallenge: true,
                    answer: '<p>Hello world</p>',
                    language:'html',
                    startCode: ''
                },
                {
                    text: '<h1>The HTML structure tags</h1> <ul>' +
                        '<li>The <span class="tag-blank">&lt;!DOCTYPE html&gt;</span> declaration defines this document to be HTML5 The </li>' +
                        '<li>The <span class="tag-blank"> &lt;html&gt;</span> element is the root element of an HTML page</li>' +
                        '<li>The <span class="tag-blank"> &lt;head&gt;</span> element contains meta information about the document</li>' +
                        '<li>The <span class="tag-blank"> &lt;title&gt;</span> element contains meta information about the document</li>' +
                        '<li>The <span class="tag-blank"> &lt;body&gt;</span> element contains meta information about the document</li>' +
                        '<li>The <span class="tag-blank"> &lt;h1&gt;</span> element contains meta information about the document</li>' +
                        '</ul>' +

                        '<p class="instructions">1. Write the following ' +
                        '<span class="tag">&lt;head&gt;&lt;/head&gt;</span>' +
                        '<span class="tag">&lt;body&gt; <br>  ' +
                        '<span class="indent">&lt;h1&gt;<span class="tag-text">Heading</span>&lt;/h1&gt;</span>' +
                        '<br> &lt;/body&gt;</span>  </p>',
                    hasCodeChallenge: true,
                    answer: '<head></head>',
                    language:'html',
                    startCode: ''
                }
            ],
            title:'HTML course',
        };
        maxStepProgress:number = 2;
        feedbackType:string = 'success';
        feedbackMessage:string = '';
        currentStep: number = 0;
        amountOfSteps:number = 17;
        progressWidth:number = 0;
        code:string =  '';
        isShowingFeedback:boolean = false;
        // answer:string = '<p>hello</p>';
        currentAnswer:string = '';
        cmOptions = {
            // codemirror options
            tabSize: 4,
            mode: 'text/html',
            theme: 'material-palenight',
            lineNumbers: true,
            line: true,
            styleSelectedText: true,
            showCursorWhenSelecting: true,
            hintOptions:{
                completeSingle: true
            }

            // more codemirror options, 更多 codemirror 的高级配置...
        };

        onCmReady(cm) {
            // console.log('the editor is readied!', cm);
        };
        onCmFocus(cm) {
            // console.log('the editor is focus!', cm);
        };
        onCmCodeChange(newCode:any) {
            // console.log('this is new code', newCode);
            this.code = newCode;
        }


        // get codemirror() {
        //     return this.$refs.myCm.codemirror
        // }

        nextStep():void{
            this.currentStep = this.currentStep +1;
            this.calculateProgressWidthNext();
        }
        prevStep():void{
            this.currentStep = this.currentStep -1;
            this.calculateProgressWidthPrev();
        }

        get stepHasEditor():boolean{
            return this.course.questions[this.currentStep].hasCodeChallenge
        }

        runCode(incomingCode:string):void{
            let lastCode:string;
            this.currentAnswer = this.code;

            let newCode = this.code.replace(/\s/g,'');
            let answer = this.course.questions[this.currentStep].answer.replace(/\s/g,'');

            console.log("entered code", newCode);
            console.log("answer code", answer);
            clearTimeout();

            if(newCode === answer){
                // alert("they alike");
                this.feedbackMessage = "Correct!";
                this.feedbackType = 'success';
                this.isShowingFeedback = true;

                this.currentStep = this.currentStep + 1;
                this.maxStepProgress = this.currentStep;

                setTimeout(() => {this.isShowingFeedback = false;}, 5000);
            }
            else {
                this.feedbackMessage = "Not quite correct!";
                this.feedbackType = 'fail';
                this.isShowingFeedback = true;
                setTimeout(() => {this.isShowingFeedback = false;}, 5000);
            }

        }

         calculateProgressWidthNext():void{
            let amountOfStepsIntoHundreds =  100 / this.amountOfSteps;
            this.progressWidth = this.progressWidth + amountOfStepsIntoHundreds;
        }
        calculateProgressWidthPrev():void{
            let amountOfStepsIntoHundreds =  100 / this.amountOfSteps;
            this.progressWidth = this.progressWidth - amountOfStepsIntoHundreds;
        }

        mounted(){
            // console.log('this is current codemirror object', this.codemirror)
            console.log(this.course);
        }
    }
</script>

<template>
    <div class="editor__wrapper">
        <!--<editor ref='myEditor'></editor>-->

        <div v-if="isShowingFeedback" class="alert" :class="{'success': feedbackType === 'success', 'fail': feedbackType === 'fail'}">
            <p>{{feedbackMessage}}</p>
        </div>

        <progress-bar
            :progressWidth="progressWidth">
        </progress-bar>

        <div class="editor__wrapper--action">
            <div>
                <button @click="prevStep()">Prev</button>
                <button @click="nextStep()" v-if="currentStep !== maxStepProgress">Next</button>
                <p>Step {{currentStep}} / {{amountOfSteps}}</p>
            </div>
            <div>
                <button @click="runCode" v-if="stepHasEditor">Run code</button>
            </div>
            <div>
               <p v-if="stepHasEditor" >Code output result</p>
            </div>
        </div>


        <div class="editor__wrapper--description" :class="{'maximize': !stepHasEditor}">
            <html-course
                    @next-step="nextStep"
                    @prev-step="prevStep"
                    :questions="course.questions"
                    :currentStep="currentStep">
            </html-course>
        </div>
        <div class="editor__wrapper--code" v-if="stepHasEditor">
            <codemirror ref="myCm"
                        :value="code"
                        :options="cmOptions"
                        @ready="onCmReady"
                        @focus="onCmFocus"
                        @input="onCmCodeChange">
            </codemirror>
        </div>

            <div class="editor__wrapper--result resizable-content" v-if="stepHasEditor" >
                <div v-html="currentAnswer">
                    <!-- dynamic content -->
                </div>
            </div>

    </div>
</template>


<style lang="scss" scoped>

    .success{
        background:greenyellow;
        color:darkblue;
    }
    .fail{
        color:darkred;;
        background:red;
    }

    .alert{
        width:200px;
        border-radius: 30px;
        height: 35px;
        position: fixed;
        right: 20px;
        top:20px;
        transition: 0.4s;
    }


    .maximize{
        width: 100% !important;
    }

    .editor__wrapper{
        width: 100%;
        height:550px;
        button{
            height: 30px;
            display: inline;
            float: left;
            margin: 11px;
            background: black;
            color: #ff4b59;
            border-radius: 2px;
            border: none;
        }
        &--action{
            height: 50px;
            display: inline-block;
            width: 100%;
            background: #2d3451;
            box-sizing: border-box;
            margin-bottom: -9px;
            div{
                button:nth-child(2n+0){
                    margin: 11px -10px;
                }
                width:33.33%;
                float: left;
                box-sizing: border-box;
                height: 100%;
                p{
                    color:#ff4b59;
                    font-weight: bold;
                }
            }

        }
        &--code{
            width: 33.33%;
            box-sizing: border-box;
           height:500px;
            float: left;

        }
        &--description{
            width: 33.33%;
            float: left;
            box-sizing: border-box;
            height:500px;

        }
        &--result{
            width: 33.33%;
            box-sizing: border-box;
            height:500px;
            float: left;

            background: #f8f8f8;
            div{
                float: left;
                padding: 50px;
            }
        }
    }

</style>
