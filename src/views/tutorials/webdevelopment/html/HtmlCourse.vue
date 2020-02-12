//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

    <script lang="ts">
        "use strict";

        import Vue from "vue";
        import {Component, Prop} from 'vue-property-decorator';

//* Component definition ************************************************************

        @Component({
            name: "html-course"
        })

//* Class ***************************************************************************

        export default class HtmlCourse extends Vue {
            @Prop({default:0}) currentStep: number | undefined;
            @Prop({default:0}) questions: number | undefined;


            nextStep(event:any):void{
                this.$emit('next-step', event);
            }
            prevStep(event:any):void{
                this.$emit('prev-step', event);
            }
        }

    </script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

    <template>
        <div class="description">

            <div class="description--step"  v-if="currentStep === i" v-for="(question, i) in questions" :key="i">
                <div  v-html="question.text"></div>
            </div>

        </div>

    </template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

    <style  lang="scss">
        .indent-wrapper{
            text-indent: 20px;
        }
        .indent{
            margin-left: 20px;
        }
        .indentX2{
            margin-left: 40px;
        }
        .instructions{
            font-weight: bold;
        }
        .tag-text{
            color:white;
        }
        .tag-blank{
            color: #ff4b59;
        }

        .tag{
            background: #292d3e;
            color: #ff4b59;
            padding: 2px 9px;
            width: 100%;
            float: left;
            box-sizing: border-box;
            font-weight: normal;
        }

        .description{
            width: 100%;
            height: 550px;
            /*&--action{*/
            /*    height: 50px;*/
            /*    width: 100%;*/
            /*    background: #2d3451;*/
            /*}*/
            &--step{
                height: 500px;
                width: 100%;
                float: left;
                text-align: left;
                background: #fbfbfb;
                padding:10px;
                box-sizing: border-box;
                overflow-y: scroll;
                p{
                    margin: 30px 0;
                }
            }
        }

    </style>
