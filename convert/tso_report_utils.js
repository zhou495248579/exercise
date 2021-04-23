var tsoFetchUrl = {
    reportUser: "api3/tso/report/link/offerTsoTicket",
    findUserTicket: "api3/interactive2/base/common/mobileController/checkTsoUser"
}, cyh = cyh || {};
cyh.rprm = {content: ""}, cyh.router = {}, cyh.router.histroy = "";
var urlPrefix = "/";
const CURRENT_TICKET_KEY = "currentTsoTicket";

function tsoUserHandle() {
    var e, t = getUrlTsoTicketParam();
    t ? (hasTsoTicket(t) || storeTsoTicketCache(t), storeCurrentTsoTicket(t), e = tsoWidParamHandle(), hasTsoTicket(t) && isTsoTicketOutDate(t) || reportTsoUser(t, e)) : clearTsoSessionCache()
}

function reportTsoUser(e, t) {
    let r = {...getRequestAdditionalParam()};
    null != t && (r = {...r, pwid: t}), reportTsoUserFetch({tsoTicket: e, ...r}).then(e => {
        0 == e.errcode ? console.log("成功") : console.error(e)
    })
}

function reportTsoUserFetch(e) {
    const r = new cyh.ajaxJson;
    return new Promise(t => {
        r.sendScore(urlPrefix + tsoFetchUrl.reportUser, e, function (e) {
            return t(e)
        })
    })
}

function shareTsoAddition() {
    return new Promise((t, r) => {
        var e = getCurrentTsoTicket();
        if (e && !isTsoTicketOutDate(e)) return t({tsoTicket: e, tsowid: getRequestAdditionalParam().wid});
        findTsoTicket(getRequestAdditionalParam()).then(e => "0" != e.errcode ? r({}) : isTsoUser(e.data.tsoTicketTag) ? t({
            tsoTicket: e.data.tsoTicket,
            tsowid: e.data.wid
        }) : t({}), () => r({}))
    })
}

function findTsoTicket(r) {
    return new Promise(t => {
        const e = new cyh.ajaxJson;
        e.sendScore(urlPrefix + tsoFetchUrl.findUserTicket, r, function (e) {
            return t(e)
        })
    })
}

function isTsoUser(e) {
    return "1" === e
}

function hasTsoTicket(e) {
    return !!getTicketCache(e)
}

function getTicketCache(e) {
    return localStorage.getItem(makeTicketCacheKey(e))
}

function getCurrentTsoTicket() {
    return sessionStorage.getItem(CURRENT_TICKET_KEY)
}

function makeTicketCacheKey(e) {
    return getRequestAdditionalParam().wid + "_" + e
}

function storeTsoTicketCache(e) {
    localStorage.setItem(makeTicketCacheKey(e), (new Date).getTime() + "")
}

function storeCurrentTsoTicket(e) {
    sessionStorage.setItem(CURRENT_TICKET_KEY, e)
}

function clearCurrentTsoTicket() {
    sessionStorage.removeItem(CURRENT_TICKET_KEY)
}

function clearTsoWidCache() {
    sessionStorage.removeItem("tsowid")
}

function clearTsoSessionCache() {
    clearCurrentTsoTicket(), clearTsoWidCache()
}

function storeTsoWid(e) {
    sessionStorage.setItem("tsowid", e)
}

function getTsoWidCache() {
    return sessionStorage.getItem("tsowid")
}

function tsoWidParamHandle() {
    var e = getUrlQueryParam("tsowid") || getUrlQueryParam("pwid");
    return e ? storeTsoWid(e) : clearTsoWidCache(), e
}

function getUrlTsoTicketParam() {
    return getUrlQueryParam("tsoTicket")
}

function getUrlQueryParam(e) {
    const t = new URLSearchParams(window.location.search);
    return t.get(e)
}

function isTsoTicketOutDate(e) {
    if (!hasTsoTicket(e)) throw new Error(`未找到对应存储的ticket-----${e}`);
    var t = parseInt(getTicketCache(e)), e = 60 * getTicketDuration(e) * 1e3;
    return (new Date).getTime() - t > e
}

function getTicketDuration(e) {
    e = e.split("_");
    return e[e.length - 1]
}

function updateUrlQueryParams(t, r) {
    if (!r) return t;
    try {
        const e = new URL(t), o = e.searchParams;
        for (const n of Object.keys(r)) null == r[n] || o.has(n) || o.append(n, r[n]);
        return e.search = o.toString(), e.toString()
    } catch (e) {
        for (const s of Object.keys(r)) t = appendQueryParam(t, s, r[s]);
        return t
    }
}

function makeQueryObject(e) {
    const t = /([^?&=]+)=([\w\W]*?)(&|$)/g, r = {};
    for (var o; null != (o = t.exec(e));) r[o[1]] = o[2];
    return r
}

function alreadyHaveQueryParams(e, t) {
    return !!makeQueryObject(e)[t]
}

function appendQueryParam(e, t, r) {
    return alreadyHaveQueryParams(e, t) ? e : e += `${-1 < e.indexOf("?") ? "&" : "?"}${t}=${r}`
}

function appendUrlTsoParam(e) {
    var t = getCurrentTsoTicket();
    if (null == t) return e;
    let r = {tsoTicket: t};
    t = getTsoWidCache();
    return null != t && (r = {...r, tsowid: t}), updateUrlQueryParams(e, r)
}

$(document).ready(function () {
    tsoUserHandle()
});