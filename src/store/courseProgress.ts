import { GetterTree, MutationTree, ActionTree } from "vuex";
import {DB} from "@/main";

export interface IUserCourseProgress {
    courseProgress:ICourseProgress[],
    userId:string,
}

export interface CourseProgressState {
    courseProgress: ICourseProgress[] | null,
    userCourseProgress:IUserCourseProgress | null;
}



export interface ICourseProgress{
    title:string,
    currentStep:number,
}




export const enum mutationStringCourseProgress{
    setCourseProgress = 'setCourseProgress',
    setUserCourseProgress = 'setUserCourseProgress',

}
export const enum actionStringCourseProgress{
    postCourseProgress = 'postCourseProgress',
    getCoursesProgress = 'getCoursesProgress'
}
export const enum getterStringCourseProgress{
    courseProgress = 'courseProgress',
}

export const state:CourseProgressState = {
    courseProgress:null,
    userCourseProgress:null,
};

export const getters: GetterTree<CourseProgressState, any> = {
    courseProgress: state => state.courseProgress,
};

export const mutations: MutationTree<any> = {
        setCourseProgress(state, payload:ICourseProgress){state.course = payload},
        setUserCourseProgress(state, payload:IUserCourseProgress){state.userCourseProgress = payload},

};


export const actions: ActionTree<CourseProgressState, any> = {
    async postCourseProgress({commit, dispatch}, payload:ICourseProgress[]):Promise<Partial<ICourseProgress>>{
        let userId = localStorage.getItem('userId');
        console.log("RAN coursproress");

        return new Promise((resolve, reject) => {
            DB.collection("courseProgress").add({
                userId:userId,
                courseProgress:payload
            }).then((res: any) => {
                console.log("actual response", res);
                resolve(res);
                // dispatch(actionStringContract.GET_CONTRACTS);
            }).catch((err: any) => {
                console.log(err);
                reject(err)
            })

        });
    },

    getCoursesProgress({commit}):Promise<IUserCourseProgress | null>{
        return new Promise((resolve, reject) => {
            let courseProgress:IUserCourseProgress | null;
            let userId = localStorage.getItem('userId');

            DB.collection("courseProgress").where("userId", "==", userId).get().then((doc:any) => {
                console.log("DOC?=", doc)
                if(doc.empty) {
                    courseProgress = null;
                }
                    doc.forEach((res: { data: () => IUserCourseProgress; id: any; }) => {
                    console.log("result from db coll", res.data());
                        courseProgress = res.data();
                    // courseProgress = singleCourseProgress as ICourseProgress;
                });

                commit(mutationStringCourseProgress.setUserCourseProgress, courseProgress);

                resolve(courseProgress);
            }).catch((e:Error) => {
                console.log("Error", e);
                reject(e);
            });
        });

    },

    // getAllCourses({commit}):Promise<ICourse[]>{
    //     return new Promise((resolve, reject) => {
    //         let courses:ICourse[] = [];

    //         DB.collection("course").get().then((doc:any) => {
    //             doc.forEach((res: { data: () => Partial<ICourse>; id: any; }) => {
    //                 let singleCourse: Partial<ICourse> = res.data();
    //                 let newCourse = {
    //                     questions:singleCourse.questions,
    //                     title:singleCourse.title,
    //                     id:res.id,
    //                 };
    //                 courses.push(newCourse as ICourse)
    //             });

    //             console.log("courselist", courses);



    //             commit(mutationStringQuestions.setCourses, courses);
    //             resolve(courses);
    //         }).catch((e:Error) => {
    //             console.log("Error", e);
    //             reject(e);
    //         });
    //     });

    // },

    

};

export const courseProgress = {
    actions,
    mutations,
    getters,
    state
};
