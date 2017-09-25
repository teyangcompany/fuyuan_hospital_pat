/**
 * Created by 李康飞 on 2017/9/21.
 */
var URL = "//test-api-ywfy.hztywl.cn/app";
var base_params = {
  channel: "23",
  format: "JSON",
  oper: "127.0.0.1",
  random: "1234",
  sign: "3f52f63fad63c5dd209d28420977fb5d",
  spid: "1001"
};
export default function (service,file,fileType,fileName,module){
  console.log(service,file,fileType,fileName,66666)
    var form = new FormData();
    for(var item in base_params){
      form.append(item,base_params[item])
    };
  form.append("service",service);
  form.append("file",file);
  form.append("fileType",fileType);
  form.append("fileName",fileName);
  form.append("module",module);
  let promiseXML = new Promise((resolve,reject)=>{
    let XMR = new XMLHttpRequest();
    XMR.open('post',URL);
    XMR.setRequestHeader( "sign","test");
    XMR.onload =function () {
      if (XMR.readyState == 4 && XMR.status >= 200 && XMR.status < 400){
        resolve(JSON.parse(XMR.responseText))
      }else {
        reject(XMR.error)
      }
    };
    XMR.send(form);
  })
  return promiseXML;
}