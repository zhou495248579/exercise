const box = document.getElementById("box"),
  content = document.getElementById("content");
console.log(box, content);
box.addEventListener(
  "click",
  () => {
    console.log("click box bubble");
  },
  false
);
content.addEventListener(
  "click",
  () => {
    console.log("click content pubble");
  },
  false
);

box.addEventListener(
  "click",
  () => {
    console.log("click box captch");
  },
  true
);
content.addEventListener(
  "click",
  () => {
    console.log("click content captch");
  },
  true
);
