import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";

interface Node {
  id: number;
  val: string;
  parentId: number;
  children?: Node[];
}
export function arrayToTree(array: Node[]): Node[] {
  const root = array[0];
  return [
    {
      id: root.id,
      val: root.val,
      parentId: null,
      children: makeChildTree(root.id, array.slice(0)),
    },
  ];
}
function makeChildTree(parentId: number, array: Node[]): Node[] {
  const childNodes = array.filter((item) => {
    return item.parentId === parentId;
  });
  childNodes.forEach((item) => {
    item.children = makeChildTree(item.id, array);
  });
  return childNodes;
}

