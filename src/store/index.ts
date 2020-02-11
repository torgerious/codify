import Vue from 'vue'
import Vuex from 'vuex'
import {questions} from "@/store/questions";

Vue.use(Vuex);

// @ts-ignore
export const store =  new Vuex.Store({
  modules: {
    questions
  }
});
