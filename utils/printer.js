import 'babel-polyfill'
import { getLodop } from './LodopFuncs'
const io = require('socket.io-client')
// service 打印服务标识 alias 服务别名
const print = io('localhost:8080/print?service=true&alias=打印服务No1')
/**
 * 创建打印任务
 * @param {*} taskName  任务名称
 * @param {*} width 纸张宽度
 * @param {*} height 纸张高度
 */
const createTask = ({ taskName, width, height }, options) => {
  const config = Object.assign({}, {
    taskName,
    width,
    height,
  }, options)
  const LODOP = getLodop() 
  // 打印检查安装，必装
  CheckIsInstall(LODOP)
  // 任务名称
  LODOP.PRINT_INIT(config.taskName)
  // 展示模式
  LODOP.SET_SHOW_MODE('NP_NO_RESULT', true)
  // 纸张大小  intOrient,intPageWidth,intPageHeight,strPageName
  LODOP.SET_PRINT_PAGESIZE(0, width, height, 'Note')
  return LODOP
}

/**
 * 打印检查安装，必装
 */
const CheckIsInstall = (LODOP) => {
  try {
    if (LODOP.VERSION) {
      if (LODOP.CVERSION) {
        alert('当前有WEB打印服务C-Lodop可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')') } else { alert('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION)
      }
    }
  } catch (err) {
    alert('请先安装C-Lodop')
    window.open('http://www.lodop.net/download.html')
  }
}
/**
* 创建打印内容
*/
const createContent = (LODOP ) => {
  LODOP.PRINT_INITA(0,0,760,321,"打印控件功能演示_Lodop功能_在线编辑获得程序代码");
  LODOP.ADD_PRINT_TEXT(10,50,175,30,"先加的内容");
}
const printHandle = ()=>{
 const LODOP = createTask({
    taskName: '标签',
    width: '800',
    height: '300'
  }, {})
 // 创建打印内容
 createContent(LODOP)
 // 预览内容
 LODOP.PREVIEW()
}
print.on('client-to-service', data=>{
  console.log('接收到的参数', data)
  if(data && data.type === 'print'){
    printHandle()
  }
})