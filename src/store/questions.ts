import { GetterTree, MutationTree, ActionTree } from "vuex";
import {DB} from "@/main";


export interface QuestionState {
    course: ICourse | null,
    courses:ICourse[] | null,
}

export interface ICourse {
    questions: IQuestions[],
    title:string,
}



export interface IQuestions {
    answer:string,
    hasCodeChallenge:boolean,
    language:string,
    startCode:string,
    text:string,
}

export const enum mutationStringQuestions{
    setCourse = 'setCourse',
    setCourses = 'setCourses'
}
export const enum actionStringQuestions{
    postCourse = 'postCourse',
    getCourses = 'getCourses',
    getAllCourses = 'getAllCourses'
}
export const enum getterStringQuestions{
    course = 'course',
    courses = 'courses'
}

export const state:QuestionState = {
    course:null,
    courses:[],
};

export const getters: GetterTree<QuestionState, any> = {
    course: state => state.course,
    courses: state => state.courses,
};

export const mutations: MutationTree<any> = {
        setCourse(state, payload:ICourse){state.course = payload},
        setCourses(state, payload:ICourse[]){state.courses = payload},

};

export const actions: ActionTree<QuestionState, any> = {
    async postCourse({commit, dispatch}, payload:ICourse):Promise<ICourse>{
        // let userId = localStorage.getItem('userId');

        return new Promise((resolve, reject) => {
            DB.collection("course").add({
                questions:payload.questions,
                title:payload.title,
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
    getCourses({commit}):Promise<ICourse>{
        return new Promise((resolve, reject) => {
            let course:ICourse;
            // let userId = localStorage.getItem('userId');

            DB.collection("course").where("title", "==", 'HTML course').get().then((doc:any) => {
                doc.forEach((res: { data: () => Partial<ICourse>; id: any; }) => {
                    let singleCourse: Partial<ICourse> = res.data();
                    let newCourse = {
                        questions:singleCourse.questions,
                        title:singleCourse.title,
                        id:res.id,
                    };
                    course = newCourse as ICourse;
                });

                commit(mutationStringQuestions.setCourse, course);
                resolve(course);
            }).catch((e:Error) => {
                console.log("Error", e);
                reject(e);
            });
        });

    },
    getAllCourses({commit}):Promise<ICourse[]>{
        return new Promise((resolve, reject) => {
            let courses:ICourse[] = [];

            DB.collection("course").get().then((doc:any) => {
                doc.forEach((res: { data: () => Partial<ICourse>; id: any; }) => {
                    let singleCourse: Partial<ICourse> = res.data();
                    let newCourse = {
                        questions:singleCourse.questions,
                        title:singleCourse.title,
                        id:res.id,
                    };
                    courses.push(newCourse as ICourse)
                });

                console.log("courselist", courses);



                commit(mutationStringQuestions.setCourses, courses);
                resolve(courses);
            }).catch((e:Error) => {
                console.log("Error", e);
                reject(e);
            });
        });

    },



};

export const questions = {
    actions,
    mutations,
    getters,
    state
};
