import { selectFirstNode } from "./tree-utils";

test("test dps", () => {
  const nodes = [
    {
      title: "node1",
      key: "1",
      disabled: true,
      children: [
        {
          title: "node1",
          key: "2",
          disabled: false,
          children: [],
        },
        {
          title: "node1",
          key: "3",
          disabled: false,
          children: [],
        },
      ],
    },
  ];
  const node = selectFirstNode(nodes);
  expect(node.key).toBe("2");
  expect(node.parent.key).toBe("1");
});
test("test dps", () => {
  const nodes = [
    {
      title: "node1",
      key: "1",
      disabled: true,
      children: [
        {
          title: "node1",
          key: "2",
          disabled: true,
          children: [],
        },
        {
          title: "node1",
          key: "3",
          disabled: true,
          children: [],
        },
      ],
    },
    {
      title: "node1",
      key: "4",
      disabled: false,
      children: [
        {
          title: "node1",
          key: "5",
          disabled: false,
          children: [],
        },
        {
          title: "node1",
          key: "6",
          disabled: false,
          children: [],
        },
      ],
    },
  ];
  const node = selectFirstNode(nodes);
  expect(node.key).toBe("4");
  expect(node.parent).toBeUndefined();
});
test("test dps", () => {
  const nodes = [
    {
      title: "node1",
      key: "1",
      disabled: true,
      children: [
        {
          title: "node1",
          key: "2",
          disabled: true,
          children: [],
        },
        {
          title: "node1",
          key: "3",
          disabled: true,
          children: [],
        },
      ],
    },
    {
      title: "node1",
      key: "4",
      disabled: true,
      children: [
        {
          title: "node1",
          key: "5",
          disabled: true,
          children: [
            {
              title: "node1",
              key: "7",
              disabled: false,
              children: [],
            },
          ],
        },
        {
          title: "node1",
          key: "6",
          disabled: false,
          children: [],
        },
      ],
    },
  ];
  const node = selectFirstNode(nodes);
  expect(node.key).toBe("7");
  expect(node.parent.key).toBe("5");
  expect(node.parent.parent.key).toBe("4");
});
