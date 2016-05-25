init();

function init() {
  getArr();
}

function getArr() {
  gDom('#t').onkeyup = oTKeyUp;
  gDom('#k').onkeyup = oKKeyUp;

}

function oTKeyUp() {

  var sTval = this.value,
      oK = gDom('#k');

  oK.value = '';

  if (!sTval) {
    showHide(oK,'none');
    removeAllHtml('#nBox');
    return;
  }
  if (!isNumber(sTval)) {
    showHide(oK,'none');
    return tipError('组数必须是数字');
  }
  if (sTval<1||sTval>100) {
    showHide(oK,'none');
    return tipError('组数必须大于等于1并且小于等于100');
  }

  tipError('');

  showHide(oK,'block');
  removeAllHtml('#nBox');
  addN(sTval);


}

function oKKeyUp() {
  var sKval = this.value;

  if (!sKval) {
    if (gDom('input',gDom('#n')).length) {
      removeAllHtml('#nBox');
      addN(gDom('#t').value);
    }
    return;
  }
  if (!isNumber(sKval)) {
    return tipError('组数必须是数字');
  }
  if (sKval<1||sKval>100) {
    return tipError('组数必须大于等于1并且小于等于100');
  }

  tipError('');

  removeAllHtml('#nBox');
  addN(gDom('#t').value);

  var iDivLen = gDom('div',gDom('#nBox')).length;

  for (var i = 0; i < iDivLen; i++) {
    for (var j = 0; j < sKval; j++) {
      addHtml({
        obj:'#n'+i,
        tip:"数据集([a,b])",
        tag: 'input'
      });
    }
  }
  showHide(gDom('#btn'),'block');

}

function test(self) {
  var sDval = self.value;
  if (!isArray(sDval)) {

  }
  console.log(sDval);
}

function addN(sTval) {
  for (var i = 0; i < sTval; i++) {
    addHtml({
      obj:'#nBox',
      id:"n",
      tag: 'div',
      iNow:i
    });
  }
}

function showHide(obj,showhide) {
  obj.style.display = showhide;
}
/**
  * obj:添加的父级
  * tip:input的提示
  * tag:什么标签
  * id:div的id
  * iNow:div的索引
  */
function addHtml(params) {
  if (params.tag==='input') {
    gDom(params.obj).innerHTML += '<input type="text" placeholder="'+ params.tip +'" onblur="test(this)" />';
  }else if (params.tag==='div'){
    gDom(params.obj).innerHTML += '<div id="'+params.id+params.iNow+'"><h6>第'+ (params.iNow+1) +'子数据</h6></div>';
  }
}


function removeHtml(obj) {
  gDom("#n").removeChild(obj);
}

function removeAllHtml(par) {
  gDom(par).innerHTML = '';
}

function isArray(str) {
  var re = /^\[\d+(,)\d+\]$/;
  return re.test(str);
}

function isNumber(str) {
  var re = /^\d+$/;
  return re.test(str);
}

function tipError(tip) {
  gDom('#error').innerHTML = tip;
}

function gDom(obj,par) {
  var obj,
      oPar = par?par:document;
  if (obj.substr(0,1)==='#') {
    obj = oPar.getElementById(obj.substr(1));
  }else {
    obj = oPar.getElementsByTagName(obj);
  }
  return obj;
}

// var arr = [
//   [1,3],
//   [2,5],
//   [6,9]
// ];
// var x = arr.length;
//
// console.log(arr);
//
// getCount();
// console.log(x);
//
// function getCount() {
//   arr.forEach(function(key,i){
//     if (arr[i+1]&&isCross(key,arr[i+1])) {
//       x--;
//     }
//   });
// }
//
// //初始需要的数组个数是N(王国数组的个数),数组之间重叠一次，即减少一次。
// function isCross(arr1,arr2) {
//   if (arr1[0]>arr2[arr2.length-1]||arr1[arr1.length-1]<arr2[0]) {
//   //如果两个数组不相邻即没有交集
//     return false;
//   }
//   return true;
// }
