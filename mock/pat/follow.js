const Mock = require("mockjs");
exports.doc = (params) => {
  return Mock.mock({
    'data|10-100': [
      {
        name: "@cname",
        msg: "@cparagraph",
        ava: "@image",
        id: "@name"
      }
    ]
  });
};
