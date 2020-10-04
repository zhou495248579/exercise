import { _get } from "./_get";

test("base", () => {
  expect(
    _get(
      {
        a: {
          b: 2,
        },
      },
      "a.b"
    )
  ).toBe(2);
  expect(
    _get(
      {
        a: {
          b: 2,
        },
      },
      "a.c"
    )
  ).toBeUndefined();
  expect(
    _get(
      {
        a: {
          b: 2,
        },
      },
      "a.c.b"
    )
  ).toBeUndefined();
    expect(
        _get(
            {
                a: {
                    b: 2,
                },
            },
            "a"
        )
    ).toEqual({
        b:2
    });
});
