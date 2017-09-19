const Mock = require("mockjs");
exports.latestmsg = (params) => {
    return Mock.mock({
        "data|5-10":[
            {
                name:"@cname",
                ava:"@image(90x90)",
                dept:"@cword(2)"+"科",
                time:"@date(HH:mm)",
                msg:"@cparagraph"
            }
        ]
    })
}