import yonerImg from "./images/yonger.jpg";

export default function () {

    const box = document.getElementById('box');

    var img = document.createElement('img');
    img.classList.add('yonger');
    img.src = yonerImg;
    box.appendChild(img);
}
