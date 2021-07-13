import * as chai from "chai";
import { catchError, map, take, filter } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { BehaviorSubject } from "rxjs";
import axios from "axios";
import { from } from "rxjs";
import { of } from "rxjs";
import { throwError } from "rxjs";
import { useObservable } from "rxjs-hooks";
const assert = chai.assert;
describe("rxjs-hooks", () => {
  it("base", (done) => {
    const ob1$ = of(1);
    const v = useObservable(() => ob1$);
    assert.equal(v, 1);
    done();
  });
});
