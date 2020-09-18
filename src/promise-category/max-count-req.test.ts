import { getDataLimit } from "./max-count-req";

test("test", () => {
  getDataLimit().then(
    (data) => {
      console.log(data);
    },
    (e) => {
      console.error(e);
    }
  );
});
