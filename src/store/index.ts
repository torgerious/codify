import Vue from 'vue'
import Vuex from 'vuex'
import {questions} from "@/store/questions";
import {users} from "@/store/users";

Vue.use(Vuex);

// @ts-ignore
export const store =  new Vuex.Store({
  modules: {
    questions,
    users
  }
});
