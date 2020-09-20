import { PromiseMock } from "./promise-mock";

test("iteration", () => {
  const p = new PromiseMock((res, rej) => {
    res("d");
  });
  p.then((d) => {
    return d + "1";
  }).then((d) => {
    expect(d).toBe("d1");
  });
  p.then((d) => {
    return d + "2";
  }).then((d) => {
    expect(d).toBe("d2");
  });
});

test("chain", () => {
  const p = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d");
    }, 3000);
  });
  p.then((d) => {
    return d + "1";
  })
    .then((d) => {
      return d + "2";
    })
    .then((d) => {
      expect(d).toBe("d12");
    });
});

test("nested", () => {
  const p = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d");
    }, 3000);
  });
  p.then((d) => {
    return new PromiseMock((res, rej) => {
      setTimeout(() => {
        res(d + "1");
      }, 3000);
    });
  }).then((d) => {
    expect(d).toBe("d1");
  });
});
