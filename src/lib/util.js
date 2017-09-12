import config from "./config"

export function makeRandom(length) {
    let str = "0123456789", ret = "";
    for (let i = 0; i < length; i++) {
        ret += str.substr(Math.floor(Math.random() * str.length), 1);
    }
    return ret;
}

export function getConsultStatusText(status) {
    let index = config.consult_status.findIndex((consult) => {
        return consult.status == status
    });
    if (index < 0) {
        index = [0, 5][Math.floor(Math.random() * 2)];
    }
    return config.consult_status[index].name;
}