<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { codemirror } from "vue-codemirror"
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/htmlembedded/htmlembedded.js'

    // theme css
    import 'codemirror/theme/material-palenight.css'

    @Component({
        name: 'editor',
        components: {
            codemirror
        }
    })
    export default class Editor extends Vue {

        @Prop({default:''}) correctAnswer: string | undefined;
        @Prop({default:'text/html'}) language:string | undefined;

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

        mounted(){
            // this.editorInit();
            console.log('this is current codemirror object', this.codemirror)
        }
    }
</script>

<template>
    <div class="editor__wrapper">
        <!--<editor ref='myEditor'></editor>-->
        <div class="editor__wrapper--action">
        <button @click="runCode">Run code</button>
        </div>
        <div class="editor__wrapper--code">
            <codemirror ref="myCm"
                        :value="code"
                        :options="cmOptions"
                        @ready="onCmReady"
                        @focus="onCmFocus"
                        @input="onCmCodeChange">
            </codemirror>
        </div>
        <div class="editor__wrapper--result">

            <div v-html="currentAnswer">
                <!-- dynamic content -->
            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>
    .editor__wrapper{
        width:1000px;
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
        }
        &--code{
           width:500px;
           height:500px;
           display: inline-block;
        }
        &--result{
            width:500px;
            height:500px;
            display: inline-block;
            background: #f8f8f8;
            div{
                float: left;
                padding: 50px;
            }
        }
    }

</style>
