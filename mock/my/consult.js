const Mock = require("mockjs");
exports.list = (params) => {
  return Mock.mock({
    'data|10-20': [
      {
        price: "￥" + "@integer(10,100)",
        content: "@cparagraph",
        imglist: "@integer(0,9)"
      }
    ]
  })
}
