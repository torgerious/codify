//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

<script lang="ts">
    "use strict";

    import Vue from "vue";
    import {Component, Prop} from 'vue-property-decorator';
    import {IRank, Rank, ranks} from "@/Types/Rank";

    //* Component definition ************************************************************

    @Component({
        name: "level-bar"
    })

//* Class ***************************************************************************

    export default class LevelBar extends Vue {
        @Prop({default:0}) progressWidth:number;
        @Prop({default:null}) rank:IRank;
        @Prop({default:0}) currentUserPoints:number;
        // points:number = 134;

        get calculateCurrentRankProgress():number{
                let rangeMax = this.rank.requiredPointsForRank;
                let levelProcentProgress = this.currentUserPoints * 100 / rangeMax;
                return levelProcentProgress;

        }

    }

</script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

<template>
    <div class="progress-bar">
        <div class="progress-bar--icon">
<!--            <img src="../assets/developer.png" alt="icon">-->
<!--            <p>Webdev level 1</p>-->
        </div>
        <p class="points"> {{rank.name}} </p>
        <div class="progress-bar--progress">
            <p>{{currentUserPoints}} / {{rank.requiredPointsForRank}}</p>
            <div class="progress" :style="{width: calculateCurrentRankProgress +'%'}"></div>
        </div>
        <p class="current-level">lvl {{rank.rankNumber}}</p>
        <p  class="next-level">lvl {{rank.rankNumber +1}}</p>
    </div>
</template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

<style scoped lang="scss">
    .points{
        height: 0;
        margin-top: 7px;
        font-weight: bold;
        span{
            font-size:12px;
            text-indent: 20px;
            color:slategray;
        }

    }

    .next-level{
        margin-top: 2px;
        float: right;
    }
    .current-level{
        float: left;
        margin-top: 2px;
    }

    .progress{
        width:45%;
        height: 100%;
        border-radius: 35px;
        background:greenyellow;
        margin-top: -34px;

    }
    .progress-bar{
        width: 95%;
        margin:5px 2.5%;


        &--progress{
            width:100%;
            border-radius: 35px;
            background:#e1e1e1;
            height: 20px;
            margin-top: 38px;
            p{
                font-size: 13px;
                font-weight: bold;
                color: #333;
            }

        }
    }
</style>
