import { fetchData } from "./fetchData";

test("test axios", (done) => {
  fetchData((data) => {
    console.log("data", data);

    expect(data).toEqual({
      success: true,
    });
    done();
  });
});
