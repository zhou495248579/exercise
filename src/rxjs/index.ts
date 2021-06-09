import { of } from "rxjs";

of(1)
  .toPromise()
  .then((d) => {
    console.log(d);
  });
