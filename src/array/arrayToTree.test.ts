import { arrayToTree } from "./arrayToTree";

test("base", () => {
  // 例如将 input 转成output的形式
  let input = [
    {
      id: 1,
      val: "学校",
      parentId: null,
    },
    {
      id: 2,
      val: "班级1",
      parentId: 1,
    },
    {
      id: 3,
      val: "班级2",
      parentId: 1,
    },
    {
      id: 4,
      val: "学生1",
      parentId: 2,
    },
    {
      id: 5,
      val: "学生2",
      parentId: 2,
    },
    {
      id: 6,
      val: "学生3",
      parentId: 3,
    },
  ];
  expect(arrayToTree(input)).toEqual([
    {
      id: 1,
      val: "学校",
      parentId: null,
      children: [
        {
          id: 2,
          val: "班级1",
          parentId: 1,
          children: [
            {
              id: 4,
              val: "学生1",
              children: [],
              parentId: 2,
            },
            {
              id: 5,
              val: "学生2",
              children: [],
              parentId: 2,
            },
          ],
        },
        {
          id: 3,
          val: "班级2",
          parentId: 1,
          children: [
            {
              id: 6,
              parentId: 3,
              val: "学生3",
              children: [],
            },
          ],
        },
      ],
    },
  ]);
});
