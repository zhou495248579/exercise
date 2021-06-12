import { of } from "rxjs";

import * as chai from "chai";
import { map, take } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { BehaviorSubject } from "rxjs";

const assert = chai.assert;
describe("rxjs", () => {
  it("base", (done) => {
    of(1)
      .toPromise()
      .then((d) => {
        assert.equal(d, 1);
        done();
      });
  });
  it("pipe", async () => {
    const d = await (of(2) as any)
      .pipe(
        map((item: number) => item + 1),
        map((item: any) => {
          return item + 1;
        })
      )
      .toPromise();
    assert.equal(d, 4);
  });
  it("combin", async () => {
    const d = (of(1) as any).pipe(map((item: number) => item + 1));
    const b = of("a") as any;
    const data = await (combineLatest(b, d) as any)
      .pipe(
        map(([a, b]) => {
          return a + b;
        }),
        take(1)
      )
      .toPromise();
    assert.equal(data, "a2");
  });
  it("BehaviorSubject", async () => {
    const a = new BehaviorSubject<number | null>(null);
    a.next(1);
    const d = (of(1) as any).pipe(map((item: number) => item + 1));
    // const data = await (combineLatest(a, d) as any)
    //   .pipe(
    //     map((item) => {
    //       return item;
    //     }),
    //     take(1)
    //   )
    //   .toPromise();
    assert.deepEqual(1, 1);
  });
});
