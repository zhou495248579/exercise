var urlPrefix = '/'
const CURRENT_TICKET_KEY = 'currentTsoTicket'
var tsoFetchUrl = {
  reportUser: 'api3/tso/report/link/offerTsoTicket',
}

function tsoUserHandle() {
  const tsoTicket = getUrlTsoTicketParam();
  // url没有ticket参数终止
  if (!tsoTicket) {
    clearTsoSessionCache()
    return
  }
  // 没有ticket立刻存下
  if (!hasTsoTicket(tsoTicket)) {
    storeTsoTicketCache(tsoTicket);
  }
  storeCurrentTsoTicket(tsoTicket);
  const tsowid = tsoWidParamHandle();
  // ticket过期不上报
  if (hasTsoTicket(tsoTicket) && isTsoTicketOutDate(tsoTicket)) {
    return;
  }
  // 上报后端ticket信息
  reportTsoUser(tsoTicket, tsowid);
}

function hasTsoTicket(tsoTicket) {
  return !!getTicketCache(tsoTicket)
}

function getTicketCache(tsoTicket) {
  return localStorage.getItem(makeTicketCacheKey(tsoTicket));
}

function makeTicketCacheKey(ticket) {
  return getRequestAdditionalParam().wid + "_" + ticket;
}

function getCurrentTsoTicket() {
  return sessionStorage.getItem(CURRENT_TICKET_KEY)
}

function getTsoWidCache() {
  return sessionStorage.getItem('tsowid')
}

function storeTsoTicketCache(ticket) {
  localStorage.setItem(makeTicketCacheKey(ticket), new Date().getTime() + '')
}

function storeCurrentTsoTicket(ticket) {
  sessionStorage.setItem(CURRENT_TICKET_KEY, ticket)
}

function clearCurrentTsoTicket() {
  sessionStorage.removeItem(CURRENT_TICKET_KEY)
}

function clearTsoWidCache() {
  sessionStorage.removeItem('tsowid');
}

function clearTsoSessionCache() {
  clearCurrentTsoTicket();
  clearTsoWidCache();
}

function storeTsoWid(tsowid) {
  sessionStorage.setItem('tsowid', tsowid)
}

function tsoWidParamHandle() {
  const tsowid = getUrlQueryParam('tsowid') || getUrlQueryParam('pwid');
  if (tsowid) {
    storeTsoWid(tsowid);
  } else {
    clearTsoWidCache();
  }
  return tsowid;
}

function getUrlTsoTicketParam() {
  return getUrlQueryParam('tsoTicket')
}

function getUrlQueryParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key)
}

function reportTsoUserFetch(param) {
  const _post = new AjaxPost();
  return new Promise((res) => {
    _post.sendScore(urlPrefix + tsoFetchUrl.reportUser, param
        , function (d) {
          return res(d)
        });
  })
}


function getRequestAdditionalParam() {
  return MYDATA.data ? {
    pid: MYDATA.data.pid,
    wid: MYDATA.data.wwid
  } : {};
}

function reportTsoUser(tsoTicket, tsowid) {
  let param = {
    ...getRequestAdditionalParam()
  }
  if (tsowid != null) {
    param = {
      ...param,
      pwid: tsowid
    }
  }

  reportTsoUserFetch({
    tsoTicket,
    ...param
  }).then((res) => {
    if (res.errcode != 0) {
      console.error(res)
      return
    }
    console.log('成功')
  })
}

function isTsoTicketOutDate(tsoTicket) {
  if (!hasTsoTicket(tsoTicket)) {
    throw new Error(`未找到对应存储的ticket-----${tsoTicket}`);
  }
  const storeTime = parseInt(getTicketCache(tsoTicket));
  const durationMillSeconds = getTicketDuration(tsoTicket) * 60 * 1000 // 分钟转换毫秒
  // console.log('start second', convertMillSecondToSecond(new Date().getTime() - storeTime))
  // console.log('rest second', convertMillSecondToSecond(new Date().getTime() - storeTime - durationMillSeconds))
  return (new Date().getTime() - storeTime) > durationMillSeconds;
}


function getTicketDuration(tsoTicket) {
  const tsoTicketParts = tsoTicket.split('_');
  return tsoTicketParts[tsoTicketParts.length - 1];
}

function updateUrlQueryParams(url, params) {
  if (!params) {
    return url;
  }
  try {
    const urlObject = new URL(url)
    const search_params = urlObject.searchParams;
    for (const key of Object.keys(params)) {
      if (params[key] != null && !search_params.has(key)) {
        search_params.append(key, params[key]);
      }
    }
    urlObject.search = search_params.toString();
    return urlObject.toString();
  } catch (e) {
    for (const key of Object.keys(params)) {
      url = appendQueryParam(url, key, params[key])
    }
    return url;
  }
}

function makeQueryObject(url) {
  const regExp = /([^?&=]+)=([\w\W]*?)(&|$)/g;
  const ret = {};
  let result = []
  while ((result = regExp.exec(url)) != null) {
    ret[result[1]] = result[2];
  }
  return ret;
}

function alreadyHaveQueryParams(url, key) {
  const ret = makeQueryObject(url);
  return !!ret[key];
}

function appendQueryParam(url, key, value) {
  if (alreadyHaveQueryParams(url, key)) {
    return url;
  }
  url += `${url.indexOf('?') > -1 ? '&' : '?'}${key}=${value}`
  return url;
}

function appendUrlTsoParam(url) {
  const tsoTicket = getCurrentTsoTicket()
  if (tsoTicket == null) {
    return url;
  }
  let param = {tsoTicket}
  const tsowid = getTsoWidCache();
  if (tsowid != null) {
    param = {
      ...param,
      tsowid
    }
  }
    return updateUrlQueryParams(url, param);
}


$(document).ready(function () {
  tsoUserHandle();
})
