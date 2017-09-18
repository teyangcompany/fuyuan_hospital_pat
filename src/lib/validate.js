import {ref, regex, req, withParams} from "vuelidate/lib/validators/common";

/*必须验证*/
export function need(value) {
  return value ? true : false;
}

/*手机号码验证*/
export function phone(value) {
  return /^1[0-9]{10}$/.test(value);
}
