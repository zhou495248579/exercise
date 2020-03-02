import html from './index.html'
import styles from './styles/index.less';


const outerObject = {
    innerObject:{
        a:1
    }
};

let innerObject = outerObject.innerObject;
outerObject.innerObject.a = 3; //这种方式修改两个变量值都会修改
console.log(innerObject, outerObject);

// outerObject.innerObject = null;
innerObject = {
    c:2
}; // 这种直接改变引用变量指向不会修改同样指向的引用变量
console.log(innerObject, outerObject);

