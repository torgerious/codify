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

        currentStep: number = 0;
        amountOfSteps:number = 17;
        progressWidth:number = 0;
        code:string =  '<p>hello</p>';
        answer:string = '<p>hello</p>';
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
            if(this.currentStep === 0){
                return false;
            }
            if(this.currentStep === 1){
                return false;
            }
            return true;
        }

        runCode(incomingCode:string):void{
            let lastCode:string;
            this.currentAnswer = this.code;

            let newCode = this.code.replace(/\s/g,'');
            let answer = this.answer.replace(/\s/g,'');

            console.log("newcode", newCode);
            console.log("newcode", answer);

            if(newCode === answer){
                alert("they alike");
            }
            else {
                console.log("not like")
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
            console.log('this is current codemirror object', this.codemirror)

        }
    }
</script>

<template>
    <div class="editor__wrapper">
        <!--<editor ref='myEditor'></editor>-->

        <progress-bar
            :progressWidth="progressWidth">
        </progress-bar>

        <div class="editor__wrapper--action">
            <div>
                <button @click="prevStep()">Prev</button>
                <button @click="nextStep()">Next</button>
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
            margin-bottom: -4px;
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
