export class RandomDispatchMoney {
    constructor(n,el) {
        this.el = el;
        this.isDispatching = false;
        this.moneyList = [];
        this.init(n);
    }

    beginRandomDispatch(ms = 1000) {
        this.isDispatching = true;
        setTimeout(() => {
                for (let i = 0; i < this.moneyList.length; i++) {
                    this.randomGiveOther(i);
                }
                this.display();
                this.beginRandomDispatch(ms);
        }, ms);

    }

    init(n) {
        for (let i = 0; i < n; i++) {
            this.moneyList[i] = 100;
        }
    }

    randomGiveOther(index) {
        if (this.moneyList[index]) {
            let i = index;
            while (i === index) {
                i = this.getRandomInt(this.moneyList.length);
            }
            this.moneyList[i]++;
            this.moneyList[index]--;
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    display() {
        this.el.innerHTML = '';
        // this.moneyList.sort(function(a, b) {
        //     return b- a;
        // });
        for(let item of this.moneyList) {
            this.el.append(this.buildItem(item));
        }
    }

    buildItem(money) {
        const item = document.createElement('div');
        item.style.height = money + 'px';
        item.style.backgroundColor = 'red';
        return item;
    }
}