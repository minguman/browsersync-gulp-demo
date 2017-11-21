
//key 请使用大写 例如 GET_USER_NAME
/**
 * @description 家芭莎H5项目接口总汇
 * @注意： 请严格按照格式来抒写，并且必须加上注释
 */


var api = function(h5Host, staticHost){

	//判断页面上是否存在该变量，如果不存在将使用指定地址

	var API = {
		staticHost: staticHost,
		h5Host: h5Host,
		search: {
			/**
			 * ALL GET
			 * 获取搜索结果内容，包含STORE,PRODUCT,EXAMPLE接口内容
			 * @param { kwyword } [String] [关键词]
			 * @param { page } [String] [页码] 默认为0
			 * @param { size } [String] [每页获取最大条数]
			 */
			ALL: h5Host + '/search/all',
			/**
			 * STORE GET
			 * 获取搜索结果 店铺 内容
			 * @param { kwyword } [String] [关键词]
			 * @param { page } [String] [页码] 默认为0
			 * @param { size } [String] [每页获取最大条数]
			 */
			STORE: h5Host + '/search/store',
			/**
			 * PRODUCT GET
			 * 获取搜索结果 商品 内容
			 * @param { kwyword } [String] [关键词]
			 * @param { page } [String] [页码] 默认为0
			 * @param { size } [String] [每页获取最大条数]
			 */
			PRODUCT: h5Host + '/search/product',
			/**
			 * EXAMPLE GET
			 * 获取搜索结果 案例 内容
			 * @param { kwyword } [String] [关键词]
			 * @param { page } [String] [页码] 默认为0
			 * @param { size } [String] [每页获取最大条数]
			 */
			EXAMPLE:h5Host + '/search/example'		
		},
		account: {
			/**
			 * LOGIN
			 * 通过手机验证码登录 POST
			 * @param { loginName } [String] [用户名或手机号]
			 * @param { pwd } [String] [用户密码 6-20]
			 * @param { verifuCode } [String] [图形验证码] 用户输入3次错误后
			 */
			LOGIN: h5Host + '/accounts/login',
			/**
			 * REGISTER
			 * 通过手机注册 POST
			 * @param { phone } String 用户手机号 11位
			 * @param { pwd } String 用户密码  6-20位
			 * @param { code } String 短信验证码 6位
			 */
			REGISTER: h5Host + '/accounts/register',
			/**
			 * LOGIN_BY_CODE 
			 * 通过手机验证码登录 GET
			 * @param {phone} String 手机号码 必传
			 * @param {code} String 6位验证码 必传
			 */
			LOGIN_BY_CODE: h5Host + '/accounts/loginphone',
			/**
			 * FIND_PWD_SEND_CODE 
			 * 找回密码发送验证码 GET
			 * @param {phone} String 手机号码 必传
			 * @param {verifyCode} String 6位验证码 必传
			 */
			FIND_PWD_SEND_CODE: h5Host + '/accounts/findpwd/sendcode',
			/**
			 * EDIT_USER_PWD_BY_CODE 
			 * 通过手机验证码更改密码 POST
			 * @param {phone} String 手机号码 必传
			 * @param {code} String 6位验证码 必传
			 * @param {newPwd} String 新密码 [6-20]位 md5加密(32位)
			 */
			EDIT_USER_PWD_BY_CODE: h5Host + '/accounts/findpwd/checkcode',
			/**
			 * CHECK_PHONE_IS_BIND 
			 * 检查用户手机号码是否绑定 GET
			 * @param {phone} String 手机号码 必传
			 */			
			CHECK_PHONE_IS_BIND: h5Host + '/accounts/check/phone',
			/**
			 * CHECK_PHONE_CODE 
			 * 验证手机验证码 GET
			 * @param phone 手机号码 必传
			 * @param verifyCode 图形验证码 非必传
			 */
			SEND_PHONE_CODE: h5Host + '/sms/sendcode',
			/**
			 * CHECK_PHONE_CODE 
			 * 验证手机验证码 GET
			 * @param phone 手机号码 必传
			 * @param code 短信验证码 必传
			 */
			CHECK_PHONE_CODE: h5Host + '/sms/checkcode',
			/**
			 * GET_VCODE 
			 * 获取图形验证码 账号密码登录，手机登录
			 */
			GET_ACCOUNT_VCODE: h5Host + '/accounts/getvcode',
			/**
			 * GET_SMS_VCODE 
			 * 注册 找回密码、
			 */
			GET_SMS_VCODE: h5Host + '/sms/getvcode'
		},
		common: {
			/**
			 * CITY 
			 * 获取城市列表 GET
			 */
			CITY: h5Host + '/common/city'
		},
		reserve:{
			SEND_PHONE_CODE:h5Host+"/reserve/code",
			CHECK_PHONE_CODE:h5Host+"/reserve/verify",
			YUYUE:h5Host+"/reserve/store",
			DESUGN:h5Host+"/reserve/design",
			STORE:h5Host+"/reserve/store",				//预约到店
			EXPO:h5Host+"/reserve/expo" 				//预约到展会
			
		},
		store:{
			ANLI:h5Host+"/store/cases",
			PRODUCT:h5Host+"/store/products",
			COMMENTS:h5Host+"/store/comments"
		},
		coupon:{
			LIST:h5Host+"/coupon/list",
			CASH:h5Host+"/user/coupon/exchange"
		},
		topic:{
			TOPLIST:h5Host+"/topic/getTopList"
		}
	}
	return API;
}


try{
	var h5Host = window.h5Host ? window.h5Host : 'http://tj.mall.hzjiehun.bid/m';
	var staticHost = window.staticHost ? window.staticHost : '//mobile.hzjiehun.bid/';
} catch(err){
	console.log(err)
}	


module.exports = api(h5Host, staticHost);
