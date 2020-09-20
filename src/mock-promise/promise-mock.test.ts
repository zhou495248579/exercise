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
  return p
    .then((d) => {
      return d + "2";
    })
    .then((d) => {
      expect(d).toBe("d2");
    });
});

test("chain", () => {
  const p = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d");
    }, 3000);
  });
  return p
    .then((d) => {
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
    }, 1000);
  });
  return p
    .then((d) => {
      return new PromiseMock((res, rej) => {
        setTimeout(() => {
          res(d + "1");
        }, 2000);
      });
    })
    .then((d) => {
      expect(d).toBe("d1");
    });
});

test("all", () => {
  const p1 = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d1");
    }, 1000);
  });
  const p2 = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d2");
    }, 1000);
  });
  const p3 = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d3");
    }, 1000);
  });
  return PromiseMock.all([p1, p2, p3]).then((d) => {
    expect(d).toEqual(["d1", "d2", "d3"]);
  });
});
test("race", () => {
  let p1 = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d1");
    }, 1000);
  });
  let p2 = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d2");
    }, 2000);
  });
  let p3 = new PromiseMock((res, rej) => {
    setTimeout(() => {
      res("d3");
    }, 3000);
  });
  return PromiseMock.race([p1, p2, p3]).then((d) => {
    expect(d).toEqual("d1");
  });
});
