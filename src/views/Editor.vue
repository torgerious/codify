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
    import {Action, Getter} from "vuex-class";
    import {actionStringQuestions, getterStringQuestions, ICourse} from "@/store/questions";
    import ErrorCodeIcon from "@/components/svg/ErrorCodeIcon.vue";
    import SuccessCodeIcon from "@/components/svg/SuccessCodeIcon.vue";
    import UserHeader from "@/components/UserHeader.vue";
    import {actionStringUser, getterStringUser, IUser} from "@/store/users";
import { actionStringCourseProgress, ICourseProgress } from '../store/courseProgress';


    @Component({
        name: 'editor',
        components: {
            UserHeader,
            SuccessCodeIcon,
            ErrorCodeIcon,
            ProgressBar,
            HtmlCourse,
            codemirror,
            VueResizable
        }
    })
    export default class Editor extends Vue {


        @Prop({default:''}) correctAnswer: string | undefined;
        @Prop({default:'text/html'}) language:string | undefined;
        @Action(actionStringQuestions.postCourse) postCourse: ((payload: ICourse) => Promise<ICourse>);
        @Action(actionStringQuestions.getCourses) getCourses: () => Promise<ICourse>;
        @Getter(getterStringQuestions.course) course:ICourse;
        @Action(actionStringUser.GET_USER)  getUser: (() => Promise<IUser>);
        @Getter(getterStringUser.user)  user:IUser;
        @Action(actionStringUser.updateUserPoints) updateUserPoints:(payload:Partial<IUser>) => Promise<void>;
        @Action(actionStringCourseProgress.postCourseProgress) postCourseProgress:(payload:ICourseProgress) => Promise<void>;


        // userProgressWidthFromDB:number = 0;
        showRunCodeButton:boolean = true;
        hasCompletedCurrentCourse:boolean = false;
        maxStepProgress:number = 5;
        feedbackType:string = 'success';
        feedbackMessage:string = '';
        currentStep: number = 0;
        amountOfSteps:number = 0;
        // progressWidth:number = 0;
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
            // if(this.userProgressWidthFromDB < this.currentStep){
            //     this.calculateProgressWidthNext();
            // }
            if(this.currentStep !== this.amountOfSteps){
                this.currentStep = this.currentStep +1;
            }

        }
        prevStep():void{
            if(this.currentStep !== 0){
                this.currentStep = this.currentStep -1;
                // this.calculateProgressWidthPrev();
            }
        }

        addCourseToDB():void{
            this.postCourse(this.course);
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
                this.feedbackMessage = "Correct answer!";
                this.feedbackType = 'success';
                this.isShowingFeedback = true;

                //Check if user is on last step of course
                if(this.currentStep +1 === this.amountOfSteps){
                    console.log("COMPLETED, added webdev to badges");
                    // this.calculateProgressWidthNext();
                    this.hasCompletedCurrentCourse = true;
                    let newPointAmount = this.user.points + 10;
                    let userCompletedCourses = this.user.completedCourses;

                    userCompletedCourses.push(this.course.title)


                    let newUserPayload:Partial<IUser> = {
                        points:newPointAmount,
                        completedCourses:userCompletedCourses,
                    };

                    this.updateUserPoints(newUserPayload);

                }else{
                    this.nextStep();
                    this.maxStepProgress = this.currentStep;
                }

                setTimeout(() => {this.isShowingFeedback = false;}, 5000);
            }
            else {
                this.feedbackMessage = "Not quite correct!";
                this.feedbackType = 'fail';
                this.isShowingFeedback = true;
                setTimeout(() => {this.isShowingFeedback = false;}, 5000);
            }

        }

        //  calculateProgressWidthNext():void{
        //     if(this.userProgressWidthFromDB > this.progressWidth){
        //         console.log("do nuthin")
        //     }else{
        //         let amountOfStepsIntoHundreds = 100 / this.amountOfSteps;
        //         this.progressWidth = this.progressWidth + amountOfStepsIntoHundreds;
        //         if (this.progressWidth >= 100) {
        //             this.progressWidth = 100;
        //             this.showRunCodeButton = false;
        //         }
        //     }
        // }
        // calculateProgressWidthPrev():void{
        //     // if(this.)
        //     let amountOfStepsIntoHundreds =  100 / this.amountOfSteps;
        //     this.progressWidth = this.progressWidth - amountOfStepsIntoHundreds;
        // }

        mounted(){
            // console.log('this is current codemirror object', this.codemirror)
        }
        async created():Promise<any>{
            let courses = await this.getCourses();
            console.log(this.course);

            await this.getUser();

            let hasCompletedThisCourse = this.user.completedCourses.includes(courses.title);

            if(hasCompletedThisCourse){
                this.hasCompletedCurrentCourse = true;
                // this.progressWidth = 100;
            }else{

            }

            //TODO Implement check to se if progress has started
            let coursePayload:ICourseProgress = {
                title:this.course.title,
                currentStep:this.currentStep,
            }
            this.postCourseProgress(coursePayload);

            





            this.amountOfSteps = courses.questions.length;
            this.maxStepProgress = 3;
            let currentUserProgress = Math.pow( this.maxStepProgress, courses.questions.length);

            // this.progressWidth = currentUserProgress;
            // this.userProgressWidthFromDB = currentUserProgress;
            // console.log("cur prog?", currentUserProgress);
            // this.calculateProgressWidthNext();



            //Mark as complete if user has completed course
            if(this.currentStep +1 === this.amountOfSteps){
                this.hasCompletedCurrentCourse = true;
            }



            console.log("Courses", courses);
        }
    }
</script>

<template>
    <div class="editor__wrapper" v-if="course">
        <!--<editor ref='myEditor'></editor>-->

        <button @click="addCourseToDB">add courses</button>
        <div v-if="isShowingFeedback" class="alert" :class="{'success': feedbackType === 'success', 'fail': feedbackType === 'fail'}">
            <error-code-icon v-if="feedbackType === 'fail'"></error-code-icon>
            <success-code-icon  v-if="feedbackType === 'success'"></success-code-icon>
            <p>{{feedbackMessage}}</p>
        </div>

        <!-- <progress-bar
            :progressWidth="progressWidth">
        </progress-bar> -->

        <div class="editor__wrapper--action">
            <div>
                <button @click="prevStep()">Prev</button>
                <button @click="nextStep()" v-if="currentStep !== maxStepProgress">Next</button>
                <p>Step {{currentStep +1}} / {{amountOfSteps}}</p>
            </div>
            <div>
                <span v-if="showRunCodeButton">
                    <button @click="runCode" v-if="stepHasEditor">Run code</button>
                </span>
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
        background: greenyellow;
        color: #ffffff;
        text-shadow: 0px 0px 20px #000000c2;
    }
    .fail{
        color: white;
        background:#ff4b59;
    }

    .alert{
        width: 200px;
        border-radius: 4px;
        height: 35px;
        position: fixed;
        right: 20px;
        top: 20px;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        box-shadow: 0px 0px 9px 0px #adadad;
        line-height: 7px;
        text-indent: -15px;
        padding: 11px 67px;
        p {
            margin-top: 14px;
            padding: 0px;
            float: right;
            position: absolute;
            margin-left: 51px;
            font-size: 20px;
        }
    }


    .maximize{
        width: 100% !important;
    }

    .editor__wrapper{
        width: 100%;
        height:550px;
        padding: 50px;
        box-sizing: border-box;
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
            background: #292d3e;
            text-align: left;
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
