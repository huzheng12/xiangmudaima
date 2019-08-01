import { observable, action, computed } from "mobx";
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:1902/";
class Demo {
    @observable count = 67676767;
    @action addJiajia = () => {
        this.count += 10
    }

    @action flgFlgSET = () => {
        this.flgFlg += 10
    }

    @observable goodstype = []

    @action async getGoodsFenlei(url) {
        await axios.get(url).then(res => {
            console.log(res,11111111111)
            console.log(this.goodstype)
            localStorage.arr = JSON.stringify(res.data.result)
            this.goodstype = res.data.result
        })
    }
}


export default new Demo()