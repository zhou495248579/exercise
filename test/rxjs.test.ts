import * as chai from "chai";
import { catchError, map, take, filter } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { BehaviorSubject } from "rxjs";
import axios from "axios";
import { from } from "rxjs";
import { of } from "rxjs";
import { throwError } from "rxjs";
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
  it("axios true", (done) => {
    // @ts-ignore
    (from(axios.get(" http://localhost:9103/mock/test")) as any)
      .pipe(
        map((d: any) => {
          return d.data;
        }),
        catchError<any, any>((e: any) => {
          return of<any>(e);
        })
      )
      .subscribe((d: any) => {
        assert.isTrue(d.data);
        done();
      });
  });
  it("axios 404", (done) => {
    // @ts-ignore
    // @ts-ignore
    (from(
      axios
        .get(" http://localhost:9103/mock/r")
        .then((d) => {
          return d.data;
        })
        .catch(() => {
          return {
            errcode: "-1",
            errmsg: "sss",
          };
        })
    ) as any).subscribe((d: any) => {
      assert.equal(d.errcode, "-1");
      done();
    });
  });
  it("catch error", () => {
    (of(1) as any)
      .pipe(
        map<any, any>((item) => {
          console.log(item, "000000");
          // throw new Error("2");

          return item + 1;
        }),
        filter((i: number) => {
            console.log('iiiiiiii')
          return i % 2 === 0;
        }),
        catchError<any, any>((e) => {
          console.error(e.message, "eeee");
          assert.equal(e.message, "2");
          return of(e);
        })
      )
      .subscribe((d: any) => d);
  });
  it("combine", async () => {
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
