export default {
  appid: "wx7d475d39a1ea1aa9",
  api_url: "//test-api-ywfy.hztywl.cn/app",
  base_params: {
    channel: "3",
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
    {name: "ask-doc", value: "快速咨询", text: "快速询问医生", btn: "免费咨询", route: "/fastConsult"},
    {name: "fast-consult", value: "问医生", text: "快速询问医生", btn: "专家解答", route: "my/consultService/consultDoc"}
  ],
  index_nav: [
    {name: "guide", value: "智能导诊", path: ""},
    {name: "book", value: "预约挂号", path: "/home/server/book"},
    {name: "queuing", value: "排队叫号",path:"/waitCallNumber"},
    {name: "payment", value: "诊间支付",path:"/consultPay"},
    {name: "report", value: "查报告单", path: '/checkReport'},
    {name: "steward", value: "住院管家",path:"/hosService"},
    {name: "help", value: "就诊指南"},
    {name: "more", value: "更多"}
    // {name: "more", value: "更多", path: '/home/moreSel'}
  ],
  my_doc_nav: [
    {name: "follow", value: "关注医生", path: "/docList"},
    {name: "circle", value: "医生圈"}
  ],
  health_nav: [
    {name: "archives", value: "健康档案", router: '/my/archives'},
    {name: "wiki", value: "健康百科",router:'/my/wiki'}
  ],
  my_nav: [
    {name: "my-consult", value: "我的咨询", path: "/consultService/myConsult"},
    {name: "my-book", value: "我的挂号", path: "/myRegistration"},
    {name: "common-visitperson", value: "常用就诊人", path: "/common-visitperson"},
    {name: "archives", value: "健康档案", path: "/archives"},
    {name: "wallet", value: "消费记录",path:'/costLog'},
    // {name: "account", value: "账户相关", path: "/accountAbout"},
    // {name: "about", value: "关于"}
  ],
  book_doc_nav: [
    {name: "bypeople", value: "按专家预约"},
    {name: "bytime", value: "按时间预约"}
  ],
  basic_situation: [
    {name: "presentingComplaint", value: "所患疾病"},
    {name: "pastHistory", value: "既往史"},
    {name: "familyHistory", value: "家族史"},
    {name: "allergyHistory", value: "过敏史"},
  ],
  basic_bar: [
    {name: "", value: "简介", "router": "intro"},
    {name: "sel", value: "精选", "router": "choiceness"},
    {name: "", value: "动态", "router": "dynamic"}
  ],
  doc_bar: [
    {name: "", value: "简介", "router": "docIntro"},
    {name: "sel", value: "精选", "router": "docChoiceness"},
    {name: "", value: "动态", "router": "docDynamic"}
  ],
  docList_bar: [
    {name: "", value: "医生"},
    {name: "", value: "团队"}
  ],
  basic_service: [
    {
      value: '图文问诊', print: '150元/3条'
    }, {
      value: '电话问诊', print: '300元/15分钟'
    }, {
      value: '视频问诊', print: '500元/15分钟'
    }, {
      value: '问他的团队', print: '50元'
    },
// <<<<<<< HEAD
//     nav: [
//         {name: "home", value: "首页"},
//         {name: "my-doc", value: "我的医生"},
//         {name: "health", value: "健康"},
//         {name: "my", value: "我的"}
//     ],
//     index_fast_nav: [
//         {name: "ask-doc", value: "快速咨询", text: "快速询问医生", btn: "免费咨询",route:"/fastConsult"},
//         {name: "fast-consult", value: "问医生", text: "快速询问医生", btn: "专家解答",route:"/consultService/consultDoc"}
//     ],
//     index_nav: [
//         {name: "guide", value: "智能导诊",path: "/login"},
//         {name: "book", value: "预约挂号", path: "/home/server/book"},
//         {name: "queuing", value: "排队叫号"},
//         {name: "payment", value: "诊间支付"},
//         {name: "report", value: "查报告单",path:'/checkReport'},
//         {name: "steward", value: "住院管家"},
//         {name: "help", value: "就诊指南"},
//         {name: "more", value: "更多",path:'/home/moreSel'}
//     ],
//     my_doc_nav: [
//         {name: "follow", value: "关注医生", path:"/docList"},
//         {name: "circle", value: "医生圈"}
//     ],
//     health_nav: [
//         {name: "archives", value: "健康档案" ,router:'/my/archives'},
//         {name: "wiki", value: "健康百科"}
//     ],
//     my_nav: [
//         {name: "my-consult", value: "我的咨询",path:"/officeConsult"},
//         {name: "my-book", value: "我的挂号",path:"/myRegistration"},
//         {name: "common-visitperson", value: "常用就诊人",path:"/common-visitperson"},
//         {name: "archives", value: "健康档案", path: "/archives"},
//         {name: "wallet", value: "我的钱包"},
//         // {name: "account", value: "账户相关",path: "/accountAbout"},
//         {name: "about", value: "关于"}
//     ],
//     book_doc_nav: [
//         {name: "bypeople", value: "按专家预约"},
//         {name: "bytime", value: "按时间预约"}
//     ],
//     basic_situation: [
//         {name:"presentingComplaint",value:"所患疾病"},
//         {name:"pastHistory",value:"既往史"},
//         {name:"familyHistory",value:"家族史"},
//         {name:"allergyHistory",value:"过敏史"},
//     ] ,
//     basic_bar: [
//         {name:"",value:"简介","router":"intro"},
//         {name:"sel",value:"精选","router":"choiceness"},
//         {name:"",value:"动态","router":"dynamic"}
//     ],
//     doc_bar:[
//         {name:"",value:"简介","router":"docIntro"},
//         {name:"sel",value:"精选","router":"docChoiceness"},
//         {name:"",value:"动态","router":"docDynamic"}
//     ],
//     docList_bar:[
//         {name:"",value:"医生"},
//         {name:"",value:"团队"}
//     ],
    // basic_service:[
// =======
  ],
  basic_text: [
    {
      text: [
        "1.您将支付150元，获取医生的3次答复机会", "2.为珍惜您的咨询机会，请全部围绕病情进行沟通，避免无关内容", "3.医生工作繁忙，可能无法及时回复您的咨询，若医生48小时未回复，我们会为您自动退款"]
    }, {
      text: [
        "1.您将支付300元，获取和医生的15分钟通话时间", "2.医生会在空余的时间主动向您发起通话，请耐心等待。", "3.若医生没有在24小时内和您通话，或者通话没有成功，我们会为您退款。"]
    }, {
      text: [
        "1.您将支付500元，获取和医生的15分钟面对面视频时间。", "2.医生会提前安排好视频时间，开始时我们会主动提醒您，请您做好准备。", "3.若医生没有在24小时内安排好视频时间，或者视频没有成功，我们会为您退款。"]
    }, {
      text: [
        "1.您将支付50元，该医生所在的团队会根据您的情况安排合适的医生来回答您的问题。", "2.所有团队的咨询，会在该团队的首席专家的监控、支持下完成；如有需要，会为您优先安排和该团队名医的一对一服务（需要支付差价）", "3.若团队24小时内未回复，我们会为您自动退款"]
    }
  ],
  basic_more: [
    {
      name: '',
      value: "就医服务",
      list: [
// >>>>>>> d56939535f39208731cd8a486cfdcccfa0f1b0ca
        {
          name: 'book',
          value: "预约挂号",
        }, {
          name: 'queuing',
          value: "排队叫号",
        }, {
          name: 'report',
          value: "查报告单",
        }, {
          name: 'payment',
          value: "诊间支付",
        }, {
          name: 'steward',
          value: "住院管家",
        }, {
          name: 'help',
          value: "就诊指南",
        }, {
          name: 'guide',
          value: "智能导诊",
        }
      ]
    }, {
      name: '',
      value: "咨询问诊",
      list: [
        {
          name: 'book',
          value: "快速咨询",
        }, {
          name: 'queuing',
          value: "问医生",
        }, {
          name: 'report',
          value: "报告解读",
        }
      ]
    }, {
      name: '',
      value: "医患关系",
      list: [
        {
          name: 'book',
          value: "我的医生",
        }, {
          name: 'queuing',
          value: "医生名片",
        }, {
          name: 'report',
          value: "医患互动",
        }, {
          name: 'report',
          value: "虚拟礼物",
        }
      ]
    }, {
      name: '',
      value: "互联网医院",
      list: [
        {
          name: 'book',
          value: "网络诊间",
        }, {
          name: 'queuing',
          value: "我的问诊",
        }, {
          name: 'report',
          value: "我的处方",
        }, {
          name: 'report',
          value: "我的检查",
        }
      ]
    }, {
      name: '',
      value: "健康服务",
      list: [
        {
          name: 'book',
          value: "健康档案",
        }, {
          name: 'queuing',
          value: "健康课堂",
        }, {
          name: 'report',
          value: "健康咨询",
        }, {
          name: 'report',
          value: "健康百科",
        }, {
          name: 'report',
          value: "健康商城",
        }, {
          name: 'report',
          value: "健康自测",
        }, {
          name: 'report',
          value: "体检预约",
        },
      ]
    }, {
      name: '',
      value: "医院信息",
      list: [
        {
          name: 'book',
          value: "医院介绍",
        }, {
          name: 'queuing',
          value: "科室介绍",
        }, {
          name: 'report',
          value: "专家介绍",
        }, {
          name: 'report',
          value: "医院导航",
        }
      ]
    },
  ]
}
