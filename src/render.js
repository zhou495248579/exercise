export default function () {
    import(/*webpackPrefetch:true*/'jquery').then(() => {
        $('.content')[0].style.background= 'red'
    })
}
