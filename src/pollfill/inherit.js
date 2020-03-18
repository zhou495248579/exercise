class Parent {
    constructor(props) {
        this.name = 'father'
    }

    getName() {
        return this.name;
    }
}

export class Child extends Parent {
    constructor() {
        super();
        this.name = 'child'
    }

    setName(name) {
        this.name = name;
    }
}
