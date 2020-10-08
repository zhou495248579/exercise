import { Config } from "./config";

export function patch(node, patches) {
  const walk = {
    index: 0,
  };
  walkPatch(node, walk, patches);
}
function walkPatch(node, walker, patches) {
  const currentPatch = patches[walker.index];

  if (node.childNodes && node.childNodes.length) {
    node.childNodes.forEach((item) => {
      walker.index++;
      walkPatch(item, walker, patches);
    });
  }
  if (currentPatch) {
    doPatch(node, currentPatch);
  }
}
function doPatch(node, patches) {
  patches.forEach((patch) => {
    switch (patch.type) {
      case Config.remove:
        node.parentNode.removeChild(node);
        break;
      case Config.modifyText:
        node.textContent = patch.data;
      default:
        break;
    }
  });
}
