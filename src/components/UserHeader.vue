//************************************************************************************
//* Script ***************************************************************************
//************************************************************************************

    <script lang="ts">
        "use strict";

        import Vue from "vue";
        import {Component, Prop} from 'vue-property-decorator';
        import ProgressBar from "@/components/ProgressBar.vue";
        import LevelBar from "@/components/LevelBar.vue";
        import {IUser} from "@/store/users";
        import {IRank, ranks} from "@/Types/Rank";

//* Component definition ************************************************************

        @Component({
            name: "user-header",
            components: {LevelBar, ProgressBar}
        })

//* Class ***************************************************************************

        export default class UserHeader extends Vue {
            @Prop({default:null}) user:IUser;


             get usersCurrentRank():IRank{
                 for(let i = 0; i < ranks.length; i++){
                     if(ranks[i].rankNumber === this.user.rank){
                         console.log("ranker", ranks[i]);
                         return ranks[i];
                     }
                 }
               // ranks.map(rank => {
               //     console.log("rank", rank);
               //
               // })
            }
        }

    </script>

//************************************************************************************
//* Template *************************************************************************
//************************************************************************************

    <template>
        <div class="user">
            <div class="user--image">
                <img src="../assets/developer.png" alt="profile-image">
            </div>
            <div class="user--bar">
                <level-bar :progressWidth="45" :currentUserPoints="user.points" :rank="usersCurrentRank"></level-bar>
            </div>
        </div>
    </template>

//************************************************************************************
//* Css ******************************************************************************
//************************************************************************************

    <style scoped lang="scss">
        .user{
            width: 100%;
            height: 100px;
            box-shadow: -3px 0px 16px 2px #3333332b;
            border-radius: 8px;
            &--image{
                width:100px;
                height: 100px;
                float: left;
                img{
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    margin:20px auto;
                    border-radius: 50%;
                    border:2px solid white;
                }
            }
            &--bar{
                width: calc(100% - 100px);
                height: 100px;
                float: left;
            }
        }
    </style>
