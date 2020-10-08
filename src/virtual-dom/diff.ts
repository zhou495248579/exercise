import { Element } from "./element";
import { Config } from "./config";
let initialIndex = 0;
export function diff(oldNode: Element, newNode: Element) {
  const patches = {};
  walkDiff(oldNode, newNode, initialIndex, patches);
  return patches;
}
function walkDiff(
  oldNode: Element | string,
  newNode: Element | string,
  index,
  patches
) {
  const diffResult = [];
  if (!newNode) {
    diffResult.push({
      type: Config.remove,
    });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    if (oldNode !== newNode) {
      diffResult.push({
        type: Config.modifyText,
        data: newNode,
      });
    }
  } else {
    if ((oldNode as Element).tagName !== (newNode as Element).tagName) {
      diffResult.push({
        type: Config.replace,
        data: newNode,
      });
    }
    if (Array.isArray((oldNode as Element).children)) {
      (oldNode as Element).children.forEach((item, i) => {
        walkDiff(
          item,
          (newNode as Element).children[i],
          ++initialIndex,
          patches
        );
      });
    }
  }
  if (diffResult.length) {
    patches[index] = diffResult;
  }
}
