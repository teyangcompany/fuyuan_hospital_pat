export default {
    key_prefix: "fyyy_pat_",
    api_url: "//test-api-ywfy.hztywl.cn/app",
    base_params: {
        channel: "23",
        format: "JSON",
        oper: "127.0.0.1",
        random: "1234",
        sign: "3f52f63fad63c5dd209d28420977fb5d",
        spid: "1001",
    },
    nav: [
        {name: "home", value: "首页"},
        {name: "my-doc", value: "我的医生"},
        {name: "health", value: "健康"},
        {name: "my", value: "我的"}
    ],
    index_fast_nav: [
        {name: "fast-consult", value: "快速咨询", text: "快速询问医生", btn: "免费咨询"},
        {name: "ask-doc", value: "问医生", text: "快速询问医生", btn: "专家解答"}
    ],
    index_nav: [
        {name: "guide", value: "智能导诊"},
        {name: "book", value: "预约挂号", path: "/home/server/book"},
        {name: "queuing", value: "排队叫号"},
        {name: "payment", value: "诊间支付"},
        {name: "report", value: "查报告单"},
        {name: "steward", value: "住院管家"},
        {name: "help", value: "就诊指南"},
        {name: "more", value: "更多"}
    ],
    my_doc_nav: [
        {name: "follow", value: "关注医生", path: "/follow-doc"},
        {name: "circle", value: "医生圈", path: "doc-circle"}
    ],
    health_nav: [
        {name: "archives", value: "健康档案"},
        {name: "wiki", value: "健康百科"}
    ],
    my_nav: [
        {name: "my-consult", value: "我的咨询", path: "/my-consult"},
        {name: "my-book", value: "我的挂号", path: "/my-book"},
        {name: "common-visitperson", value: "常用就诊人", path: "/common-visitperson"},
        {name: "archives", value: "健康档案", path: "/archives"},
        {name: "wallet", value: "我的钱包", path: "/wallet"},
        {
            name: "account", value: "账户相关", path: "/account", child: [
            {name: "", value: "修改绑定手机号"},
            {name: "", value: "修改密码"}
        ]
        },
        {name: "about", value: "关于", path: "/about"}
    ],
    book_doc_nav: [
        {name: "bypeople", value: "按专家预约"},
        {name: "bytime", value: "按时间预约"}
    ],
    basic_situation: [
        {name: "", value: "所患疾病"},
        {name: "", value: "既往史"},
        {name: "", value: "家族史"},
        {name: "", value: "过敏史"},
    ],
    consult_type_nav: [
        {name: "", value: "全部问诊"},
        {name: "", value: "全部状态"}
    ],
    consult_status: [
        {name: "待付款", status: "0"},
        {name: "待处理", status: "1"},
        {name: "进行中", status: "3"},
        {name: "待评价", status: "5"},
        {name: "已评价", status: "7"},
        {name: "已取消", status: "-1"},
    ],
    book_order_status: [
        {name: "已取消", status: "0"},
        {name: "待取号", status: "1"},
        {name: "待评价", status: "2"},
        {name: "已评价", status: "3"},
        {name: "已过期", status: "4"}
    ],
    help: [
        {name: "全科分诊", class: "qkfz"},
        {name: "名医视频", class: "mysp"},
        {name: "在线医生", class: "zxys"},
        {name: "预约挂号", class: "yygh"},
        {name: "常用就诊人", class: "cyjzr"},
        {name: "健康档案", class: "jkda"},
        {name: "消费明细", class: "xfmx"},
        {name: "修改绑定手机号", class: "xgbdsjh"},
        {name: "修改密码", class: "xgmm"}
    ]
}
