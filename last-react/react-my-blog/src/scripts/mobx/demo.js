import { observable, action, computed } from "mobx";
import axios from 'axios'
//用于photos
class Demo {
    @observable wer = "请在下面input框输入修改内容"
    @action wohenzai = (a) => {
        this.wer = a
    }
}


export default new Demo()