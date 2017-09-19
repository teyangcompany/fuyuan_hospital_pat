const Mock = require("mockjs");
const {resolve} = require("path");
const shelljs=require("shelljs");

module.exports = (req, res) => {
    let params = (req.body);
    let file = resolve(__dirname);
    let service = params.service;

    let moduLeArr = service.split(".");
    let moduleFile = moduLeArr.slice(0, moduLeArr.length - 1).join("/");
    let moduleDir = moduLeArr.slice(0, moduLeArr.length - 2).join("/");
    try {
        shelljs.mkdir("-p",resolve(__dirname, moduleDir));
        let data = require(resolve(__dirname, moduleFile))[moduLeArr[moduLeArr.length - 1]](params);
        res.json({
            code: 0,
            data: data.data
        })
    } catch (e) {
        require(resolve(__dirname, 'error.js'))(moduLeArr.toString() + ":" + e.toString(), res);
    }
};
