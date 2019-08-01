import { INNSER, NAMECONTENT, NUMLIUYSN, USERNAME, LILILIFLG, BIANJILIUYAN, HUOQU } from "../action";
const defaultState = {
    time: {},
    jiyu: "",
    num: 0,
    flg: true,
    wflg: true,
    _id: null,
    huoqu: false
}

export const count = (state = defaultState, action) => {
    switch (action.type) {

        case HUOQU:
            return { ...state, huoqu: action.num }
        case BIANJILIUYAN:
            return { ...state, _id: action.num }
        case LILILIFLG:
            return { ...state, wflg: action.num }
        case USERNAME:
            return { ...state, flg: action.num }
        case NUMLIUYSN:
            return { ...state, num: action.num }
        case NAMECONTENT:
            return { ...state, jiyu: action.content }
        case INNSER:
            return { ...state, time: action.time }
        default:
            return state;
    }
}