//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

    <script lang="ts">
        "use strict";

        import Vue from "vue";
        import {Component, Prop} from 'vue-property-decorator';

//* Component definition ************************************************************

        @Component({
            name: "progress-bar"
        })

//* Class ***************************************************************************

        export default class ProgressBar extends Vue {
            @Prop({default:0}) progressWidth:number;

        }

    </script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

    <template>
        <div class="progress-bar">
            <div class="progress-bar--icon">
                <img src="../assets/developer.png" alt="icon">
                <p>Webdev level 1</p>
            </div>
            <div class="progress-bar--progress">
                <div class="progress" :style="{width: progressWidth +'%'}"></div>
            </div>
        </div>
    </template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

    <style scoped lang="scss">

        .progress{
            width:45%;
            height: 100%;
            border-radius: 35px;
            background:greenyellow;
        }
        .progress-bar{
            width: 95%;
            height: 200px;
            margin:5px 2.5%;
            &--icon{
                width:100%;
                height:100px;
                img{
                    height: 110px;
                    margin:0 auto;
                    display: block;
                }
                p{
                    font-size: 12px;
                    margin-top: 0px;
                    font-weight: bold;
                    color: #2d3451;
                }
            }
            &--progress{
                width:100%;
                border-radius: 35px;
                background:#e1e1e1;
                height: 20px;
                margin-top: 38px;
            }
        }
    </style>
