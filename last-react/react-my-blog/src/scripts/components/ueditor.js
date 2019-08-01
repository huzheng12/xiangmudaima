/**
 * Created by GuoMiaomiao on 2018/4/18.
 */
import React from 'react';
import store from '../../scripts/store'
import { lililiflg, huoqu } from '../action';
import { connect } from "react-redux"
import axios from "axios";
import { history } from "../../utils/history"
// import UE from '../ueditor/ueditor.all';
const UE = window.UE;
// let editor=null;
@connect(
  state => {
    return {
      time: state.data.time,
      _id: state.data._id,
      wflg: state.data.wflg,
      huoqu: state.data.huoqu
    }
  }
)

class Ueditor extends React.Component {
  static defaultProps = {
    config: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      editor: '',
      number: 1
    };
  }

  componentDidMount() {
    this.initEditor()
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);

  }

  initEditor() {
    /*初始化编辑器*/
    const { id, config } = this.props;
    const ueEditor = UE.getEditor(this.props.id, config);
    const self = this;

    ueEditor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }
    });
    let editor = ueEditor;
    this.setState({ editor });
  }
  getVal() {
    /*获取编辑器内容函数*/
    let { editor } = this.state;
    let content = editor.getContent();
    return content;
  }
  quxiao = () => {
    store.dispatch(lililiflg(true))
    store.dispatch(huoqu(false))
    this.setState({
      number: 1
    })
  }
  huoquss = () => {
    axios.get("/vue/webcontetxiqs", { params: { _id: this.props._id } }).then(res => {
      console.log(0 + "sdlkfjl", res)
      var arr = res.data.result.length > 0 ? res.data.result[0] : res.data.result;
      this.refs.title.value = arr.title;
      this.refs.cart.value = arr.cart;
      console.log(arr.consten)
      var content = arr.consten
      UE.getEditor('content1').setContent(content)
      this.setState({
        number: 0
      })
    })

  }
  queren = () => {
    console.log(UE.getEditor('content1').getContent())
    const consten = UE.getEditor('content1').getContent()
    var times = this.props.time
    var time = `${times.year}/${times.month}/${times.riqi} ${times.hour}:${times.min}`
    var title = this.refs.title.value;
    var cart = this.refs.cart.value;
    var name = "hz1282"
    console.log(time)
    if (this.state.number == 1) {
      console.log("新增")
      if (time && title && cart && name && consten) {
        axios.get("/vue/webcontetxinzeng", { params: { time, consten, title, cart, name, id: this.props._id } }).then(res => {
          store.dispatch(huoqu(false))
          this.setState({
            number: 1
          })
          if (res.data.msg == "数据新增成功") {
            console.log(res.data)
            var id = res.data.result[0]._id
            history.push(`/home/xiangq?id=${id}`)
            store.dispatch(huoqu(false))
          }
        })
      } else {
        alert("请输入标题，内容，分类")
      }
    } else {
      if (time && title && cart && name && consten) {
        axios.get("/vue/webcontetxinzeng", { params: { time, consten, title, cart, name, id: this.props._id } }).then(res => {

          store.dispatch(huoqu(false))
          this.setState({
            number: 1
          })
          if (res.data.msg == "数据修改成功") {
            var id = res.data.args._id
            history.push(`/home/xiangq?id=${id}`)
            store.dispatch(huoqu(false))

          }
        })
      } else {
        alert("请输入标题，内容，分类")
      }
    }

  }
  render() {

    let { content, id, wflg, huoqu } = this.props;
    return (
      <div style={{ display: wflg ? "none" : 'block' }}>
        <button onClick={this.queren} style={{ display: sessionStorage.username == "hz1282" ? "inline-block" : "none" }} className="but-a-anniu but" >发表</button>
        <button onClick={this.queren} style={{ display: sessionStorage.username == "hz1282" ? "none" : "inline-block" }} className="but-a-anniu but" >博主才能发表</button>
        <button onClick={this.huoquss} style={{ display: huoqu ? "inline-block" : 'none' }} className="but-a-anniu but" >获取详情内容</button>
        <button onClick={this.quxiao} className="but-a-anniu but" >取消并返回</button>
        <p style={{ maginTop: 200, fontSize: 37, marginBottom: 10, position: "relative" }}>
          <label htmlFor="">标题</label>
          <input type="text" ref="title" style={{
            width: 500,
            height: 50,
            background: "transparent",
            border: "1px solid rgb(240, 208, 169)",
            fontSize: "36px",
            marginLeft: "41px"
          }} />
          <p style={{ fontSize: 16 }}>
            <label htmlFor="cart">分类</label>
            <input ref="cart" style={{
              background: "transparent",
              border: "1px solid rgb(240, 208, 169)",
              marginLeft: "41px",
              lineHeight: "20px",
              height: 20
            }} type="text" id="cart" />
          </p>
        </p>
        <textarea id={id}
          defaultValue={content}
          onChange={this.getVal} />
      </div>
    )
  }
}
export default Ueditor;
