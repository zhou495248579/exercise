import { alreadyHaveQueryParams, appendUrlTsoParam } from "./appendQueryParam";

describe("测试添加查询参数", () => {
  // test("简单", () => {
  //     expect(appendUrlTsoParam('http://wwww.baidu.com',{key:'value'})).toBe('http://wwww.baidu.com/?key=value');
  // });
  test("不完整url", () => {
    expect(
      appendUrlTsoParam("baidu.com", {
        a: "a",
      })
    ).toBe("baidu.com?a=a");
  });
});

describe("url是否含有查询参数", () => {
  test("base no", () => {
    expect(alreadyHaveQueryParams("baidu.com", "a")).toBe(false);
  });
  test("base yes", () => {
    expect(alreadyHaveQueryParams("baidu.com?a=a", "a")).toBe(true);
  });
  test("more params", () => {
    expect(
      alreadyHaveQueryParams(
        "http://3400.promotion.n.saas.weimobqa.com/saas/promotion/groupon/3400/5649?storeId=12556400&tsoTicket=1_0_14_118_2880",
        "tsoTicket"
      )
    ).toBe(true);
  });
    test("wrong url", () => {
        expect(
            alreadyHaveQueryParams(
                "saas/promotion/groupon/3400/5649?storeId=12556400&tsoTicket=1_0_14_118_2880",
                "tsoTicket"
            )
        ).toBe(true);
    });
    test("没有?有值", () => {
        expect(
            alreadyHaveQueryParams(
                "storeId=12556400&tsoTicket=1_0_14_118_2880",
                "storeId"
            )
        ).toBe(true);
    });
    test("没有？没值", () => {
        expect(
            alreadyHaveQueryParams(
                "storeId=12556400&tsoTicket=1_0_14_118_2880",
                "tsowid"
            )
        ).toBe(false);
    });
    test("params part有值", () => {
        expect(
            alreadyHaveQueryParams(
                "?storeId=12556400&tsoTicket=1_0_14_118_2880&tsowid=23424&ttttt=23423",
                "storeId"
            )
        ).toBe(true);
    });
    test("params part没值", () => {
        expect(
            alreadyHaveQueryParams(
                "?storeId=12556400&tsoTicket=1_0_14_118_2880&tsowid=23424&ttttt=23423",
                "story"
            )
        ).toBe(false);
    });
    test("params part", () => {
        expect(
            alreadyHaveQueryParams(
                "storeId=12556400&tsoTicket=1_0_14_118_2880&tsowid=23424&ttttt=23423",
                "vvv"
            )
        ).toBe(false);
    });
});
