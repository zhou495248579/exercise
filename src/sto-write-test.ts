export function queryParse(sourceUrl: string) {
  let params = {};

  if (!sourceUrl) {
    return params;
  }
  const reg = /(?:\?|\&)([^=#]+)(?:\=([^&]*))?/g;
  let array;
  while ((array = reg.exec(sourceUrl)) !== null) {
    params[array[1]] = array[2] ? array[2] : null;
  }
  return params;
}
export function isSymmetricalClosed(path) {
    /**
     * 此处写代码逻辑
     */
    if (typeof path === "string") {
        return path.split("->").reverse().join("->") === path;
    }

    return false;
}
// function printList(list, delay) {
//   /**
//    * 此处写代码逻辑
//    */
//   function __delay(delay: number) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve();
//       }, delay);
//     });
//   }
//
//   (async function __printList(list, delay) {
//     for (let i = 0; i < list.length; i++) {
//       console.log(list[i]);
//       if (i !== list.length - 1) {
//         await __delay(delay);
//       }
//
//     }
//   })(list, delay);
// }

// printList([1, 2, 3, 4], 2000);
const sourceTree = {
  id: "i1",
  value: 17,
  left: {
    id: "i3",
    value: 83,
    left: {
      id: "i4",
      value: 101,
    },
    right: {
      id: "i9",
      value: 22,
    },
  },
  right: {
    id: "i11",
    value: 26,
  },
};
// 出参格式参考：
const maxNode = {
  id: "i4",
  value: 101,
};
//
// function findMaxNode(tree) {
//   /**
//    * 此处写代码逻辑
//    */
//   if (!tree) {
//     return null;
//   }
//   let maxNode = null;
//
//   // if (!maxNode) {
//   //   maxNode = tree;
//   // } else {
//   //   if (maxNode.value < tree.value) {
//   //     maxNode = tree;
//   //   }
//   // }
//     // __findMaxNode(tree.left);
//     // findMaxNode(tree.right);
//     return  __findMaxNode(tree,maxNode)
//   function __findMaxNode(tree, maxNode) {
//     if (!tree) {
//       return maxNode;
//     } else {
//       if (!maxNode || (maxNode.value < tree.value)) {
//         maxNode = {
//             id:tree.id,
//             value:tree.value
//         };
//       }
//     }
//     const leftMaxNode = __findMaxNode(tree.left, maxNode) || {};
//     const rightMaxNode = __findMaxNode(tree.right, maxNode) || {};
//     return leftMaxNode.value > rightMaxNode.value ? leftMaxNode : rightMaxNode;
//   }
// }
//
// console.log(findMaxNode(sourceTree));
// console.log(findMaxNode({ id: "i1", value: 10 }))
// console.log(findMaxNode({ id: "i1", value: 10, left: { id: "i2" } }))
class Calendar {
  /**
   * 此处写代码逻辑
   */
  booksMap = new Map<number, number>();

  constructor() {}
  private canBook(start, end): boolean {
    if (!start || !end || start > 31 || end > 31) {
      return false;
    }
    for (let i = start; i <= end; i++) {
      if (this.booksMap.get(i) >= 2) {
        return false;
      }
    }
    return true;
  }
  protected toBook(start, end) {
    for (let i = start; i <= end; i++) {
      const value = this.booksMap.get(i) || 0;
      this.booksMap.set(i, value + 1);
    }
  }
  public book(start, end) {
    if (this.canBook(start, end)) {
      this.toBook(start, end);
      return true;
    } else {
      return false;
    }
  }
}

const mySchedule = new Calendar();
// console.log(mySchedule.book(0, 0));
// console.log(mySchedule.book(32, 35));
console.log(mySchedule.book(1, 10));
console.log(mySchedule.book(8, 14));
console.log(mySchedule.book(12, 16));
console.log(mySchedule.book(22, 30));
console.log(mySchedule.book(2, 9));
console.log(mySchedule.book(18, 20));

console.log(mySchedule.book(13, 17));

// assert(mySchedule.book(1, 10) === true);
// assert(mySchedule.book(8, 14) === true);
// assert(mySchedule.book(12, 16) === true);
// assert(mySchedule.book(22, 30) === true);
// assert(mySchedule.book(2, 9) === false);
// assert(mySchedule.book(18, 20) === true);
// assert(mySchedule.book(13, 17) === false);
