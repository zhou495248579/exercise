import { getCookieValue } from "./cookieValue";

test("base", () => {
  let v1 = getCookieValue(
    "cookieIsEnableCheckTest=1; isPortal=false;cookieValue=6c1dea38162bc5ef5b9748f8bf445cf2"
  );
  expect(v1).toBe("6c1dea38162bc5ef5b9748f8bf445cf2");
  v1 = getCookieValue("cookieIsEnableCheckTest=1; isPortal=false;");
  expect(v1).toBeNull();
  v1 = getCookieValue(
    "cookieIsEnableCheckTest=1; cookieValue=6c1dea38162bc5ef5b9748f8bf445cf2;isPortal=false;"
  );
  expect(v1).toBe("6c1dea38162bc5ef5b9748f8bf445cf2");
    v1 = getCookieValue(
        "cookieValue=6c1dea38162bc5ef5b9748f8bf445cf2;"
    );
    expect(v1).toBe("6c1dea38162bc5ef5b9748f8bf445cf2");
    expect(v1).toBe("6c1dea38162bc5ef5b9748f8bf445cf2");
    v1 = getCookieValue(
        "cookieValue=6c1dea38162bc5ef5b9748f8bf445cf2"
    );
    expect(v1).toBe("6c1dea38162bc5ef5b9748f8bf445cf2");
});

test("空", () => {
  let v1 = getCookieValue("");
  expect(v1).toBeNull();
  v1 = getCookieValue(null);
  expect(v1).toBeNull();
});
