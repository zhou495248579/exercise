export default function Counter() {
    const btn = document.createElement('button');
    btn.innerText = '1';
    btn.addEventListener('click',  () => {
        btn.innerText = parseInt(btn.innerText, 10) + 1 + '';
    })
    document.body.appendChild(btn);
}
