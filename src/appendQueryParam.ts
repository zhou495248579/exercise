export function appendQueryParam(url, key, value) {
  if (alreadyHaveQueryParams(url, key)) {
    return url;
  }
  url += `${url.indexOf("?") > -1 ? "&" : "?"}${key}=${value}`;
  return url;
}

export function alreadyHaveQueryParams(url: string, key: string): boolean {
  let reg = new RegExp(`(?<=\\b${key}=)[^&]*`);
  const match = url.match(reg);
  console.log("match", match);
  return !!(match && match[0]);
}

export function updateUrlQueryParams(url, params) {
  if (!params) {
    return url;
  }
  const urlObject = new URL(url);
  const search_params = urlObject.searchParams;
  for (const key of Object.keys(params)) {
    if (params[key] != null && !search_params.has(key)) {
      search_params.append(key, params[key]);
    }
  }
  urlObject.search = search_params.toString();
  return urlObject.toString();
}

export function appendUrlTsoParam(
  url: string,
  param: { [key: string]: string }
) {
  try {
    new URL(url);
    return updateUrlQueryParams(url, param);
  } catch (e) {
    for (const key of Object.keys(param)) {
      url = appendQueryParam(url, key, param[key]);
    }
    return url;
  }
}
