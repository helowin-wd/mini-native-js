const funcNames = ['requestFullScreen', 'msRequestFullscreen', 'webkitRequestFullScreen', 'mozRequestFullScreen']

function getPropertyName(names, target) {
  return names.find(name => name in target)
}

//全屏
function fullScreen(element = document.documentElement) {
  //IE 10及以下ActiveXObject
  if (window.ActiveXObject) {
    const WsShell = new ActiveXObject('WScript.Shell')
    WsShell.SendKeys('{F11}')
    //写全屏后的执行函数
  }
  const enterFullScreenName = getPropertyName(funcNames, element)
  enterFullScreenName && element[enterFullScreenName]()
}

//退出全屏
function fullExit(element = document.documentElement) {
  //IE ActiveXObject
  if (window.ActiveXObject) {
    const WsShell = new ActiveXObject('WScript.Shell')
    WsShell.SendKeys('{F11}')
    //写退出全屏后的执行函数
  }

  const exitFullScreenName = getPropertyName(funcNames, element)
  const screenType = {
    requestFullScreen: 'exitFullscreen',
    msRequestFullscreen: 'msExitFullscreen',
    webkitRequestFullScreen: 'webkitCancelFullScreen',
    mozRequestFullScreen: 'mozCancelFullScreen'
  }
  exitFullScreenName && document[screenType[exitFullScreenName]]()
}
