import { Vue } from "./mock-vue/vue.js";
const box = document.getElementById("box"),
  btn = document.getElementById("btn"),
  content = document.getElementById("content");

const v = new Vue(box, {
  h: "<p>hahaha</p>",
  val: "s",
});
btn.addEventListener(
  "click",
  () => {
    v.$data.val = "click change";
  },
  false
);
// console.log(box, content);
// box.addEventListener(
//   "click",
//   () => {
//     console.log("click box bubble");
//   },
//   false
// );
// content.addEventListener(
//   "click",
//   () => {
//     console.log("click content pubble");
//   },
//   false
// );
//
// box.addEventListener(
//   "click",
//   () => {
//     console.log("click box captch");
//   },
//   true
// );
// content.addEventListener(
//   "click",
//   () => {
//     console.log("click content captch");
//   },
//   true
// );
