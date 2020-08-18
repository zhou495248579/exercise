export interface BaseTreeNodeIf {
  title: string;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  selected?: boolean;
}

export interface TreeNodeIf extends BaseTreeNodeIf {
  indeAuth?: any;
  authed?: boolean;
  checked?: boolean;
  expanded?: boolean;
  category?: string;
  children?: TreeNodeIf[];
  code?: string;
  expand?: boolean;
  origin?: any;
  isChecked?: boolean;
  parent?: TreeNodeIf;
}
/**
 * @description 深度遍历第一个不是disable的节点
 */
export function selectFirstNode(nodes: TreeNodeIf[]): TreeNodeIf {
  if (!nodes.length) {
    return null;
  }
  let stack = [...nodes];
  while (stack.length) {
    const node = stack.shift();
    if (!node.disabled) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      node.children.map((item) => {
        item.parent = node;
      });
      stack = [...node.children, ...stack];
    }
  }
}
