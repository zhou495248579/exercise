// const box = document.getElementById("box"),
//   content = document.getElementById("content");
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
import { Element } from "./virtual-dom/element";
import { diff } from "./virtual-dom/diff";
import { patch } from "./virtual-dom/patch";
const btn = document.getElementById("btn");
let r = null;
btn.addEventListener(
  "click",
  () => {
    const dom1 = new Element("ul", [
      new Element("li", ["chapter4"]),
      new Element("li", ["chapter5"]),
      new Element("li", ["chapter6"]),
    ]);
    const dom2 = new Element("ul", [
      new Element("li", ["chapter4"]),
      new Element("li", ["chapter7"]),
    ]);
    const pathes = diff(dom1, dom2);
    console.log(pathes);
    patch(r, pathes);
  },
  false
);
r = new Element("ul", [
  new Element("li", ["chapter4"]),
  new Element("li", ["chapter5"]),
  new Element("li", ["chapter6"]),
]).render();
document.body.append(r);
