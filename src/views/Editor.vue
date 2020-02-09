<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
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
        code:string =  'const a = 10';
        answer:string = '<p>hello there</p>';
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
        onCmCodeChange(newCode) {
            // console.log('this is new code', newCode);
            this.code = newCode;
        }


        get codemirror() {
            return this.$refs.myCm.codemirror
        }

        runCode():void{
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
    <div>
        <h1>Editor page</h1>
        <!--<editor ref='myEditor'></editor>-->
        <button @click="runCode">Run code</button>
        <div class="editor">
            <codemirror ref="myCm"
                        :value="code"
                        :options="cmOptions"
                        @ready="onCmReady"
                        @focus="onCmFocus"
                        @input="onCmCodeChange">
            </codemirror>
        </div>
    </div>
</template>


<style lang="scss" scoped>
   .editor{
       width:500px;
       height:500px;
   }

</style>
