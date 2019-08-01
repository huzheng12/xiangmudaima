import axios from 'axios'

export const INNSER = "innser"
export function innser(time) {
    return {
        type: INNSER,
        time
    }
}

export const NAMECONTENT = "namecontent"
export function namecontent(content) {
    return {
        type: NAMECONTENT,
        content
    }
}

export const NUMLIUYSN = "NUMLIUYSN"
export function numliuyan(num) {
    return {
        type: NUMLIUYSN,
        num
    }
}
export const USERNAME = "USERNAME"
export function usernmae(num) {
    return {
        type: USERNAME,
        num
    }
}
export const LILILIFLG = "LILILIFLG"
export function lililiflg(num) {
    return {
        type: LILILIFLG,
        num
    }
}

export const BIANJILIUYAN = "BIANJILIUYAN"
export function bianjiliuyan(num) {
    return {
        type: BIANJILIUYAN,
        num
    }
}

export const HUOQU = "HUOQU"
export function huoqu(num) {
    return {
        type: HUOQU,
        num
    }
}

