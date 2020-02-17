import _Vue from "vue";

/********************************************
 Plugin to add objects to vue prototype
 */
export default function (Vue: typeof _Vue, options?: Record<string, any>) {
    if (options == null) {
        return;
    }

    Object.keys(options).forEach(key => {
        Vue.prototype[key] = options[key];
    });
}
