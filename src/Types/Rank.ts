"use strict";

export enum Rank {
    RANK_1 = 1,
    RANK_2 = 2,
    RANK_3 = 3,

}

export interface IRank {
    name:string,
    rankNumber:number,
    requiredPointsForRank:number,
}


export const ranks: IRank[] = [
    {name:'nub coder', rankNumber:Rank.RANK_1, requiredPointsForRank:100},
    {name:'has touched code', rankNumber:Rank.RANK_2, requiredPointsForRank:200},
    {name:'has written code', rankNumber:Rank.RANK_3, requiredPointsForRank:300},
];
