import {
	ajax,
	askDialogToast,
	sessionStorage,
	localStorage
} from '@/utils';

import * as config from '@/config.js';

const baseURL = config.BASE_URL;

export class User{
	get user(){
		return sessionStorage.getItem('user') || localStorage.getItem('user') || 'none';
	}
	set user(val){

		let _suser = sessionStorage.getItem('user');
		if(_suser) sessionStorage.removeItem('user');

		let _luser = localStorage.getItem('user');
		if(_luser) localStorage.removeItem('user');
		
		if(val.remember){
			localStorage.setItem('user', val);
		}else {
			sessionStorage.setItem('user', val);
		}
	}

	get auth(){
		return sessionStorage.getItem('auth') || 'none';
	}
	set auth(val){
		let _sauth = sessionStorage.getItem('auth');
		if(_sauth) sessionStorage.removeItem('auth');

		sessionStorage.setItem('auth', val);
	}

	login(opt){
		let option = {
			username: opt.user,
			password: opt.pass,
			method: 'web.login'
		}
		return this._ajax('post',option,opt);
	}
	loginOut(force){
		let _suser = sessionStorage.getItem('user');
		if(_suser) sessionStorage.removeItem('user');

		if(force == !0){
			let _luser = localStorage.getItem('user');
			if(_luser) localStorage.removeItem('user');
		}

		let _sauth = sessionStorage.getItem('auth');
		if(_sauth) sessionStorage.removeItem('auth');
		return new Promise((resolve,reject)=>{
			resolve();
		});
	}
	_ajax(method,options,user){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if (r.error) {
					askDialogToast({ msg: r.error.message || '接口请求失败', time: 2000, class: 'danger' });
					return;
				}
				if(r.data.code != 1000) {
					askDialogToast({msg:r.data.message? r.data.message:'接口请求失败',time:2000,class:'danger'});
					return;
				}
				this.auth = r.data.data.access_token;
				this.user = user;
			}
		});
	}
}

export class Device{
	list(auth){
		let option = {
			access_token: auth,
			method: "web.devicelist"
		}
		return this._ajax('post',option);
	}
	search(opt){
		let option = {
			access_token: opt.auth,
			keyword: opt.search,
			method: "web.devicelist"
		}
		return this._ajax('post',option);
	}

	currentPostion(opt){
		let option={
			"access_token": opt.auth, 
		    "imei": opt.imei, 
		    "method": "device.now"
		}
		return this._ajax('post',option);
	}

	searchPosition(opt){
		let option={
			"access_token": opt.auth, 
		    "imei": opt.imei, 
		    "start_time": opt.start, 
		    "end_time": opt.end, 
		    "method": "device.info"
		}
		return this._ajax('post',option);
	}
	getSetInfo(opt){
		let option={
			"access_token": opt.auth, 
		    "imei": opt.imei, 
		    "method": "device.now"
		}
		return this._ajax('post',option);
	}
	getAbnormal(opt){
		let option={
			"access_token": opt.auth, 
		    "imei": opt.imei, 
		    "method": "web.clicklog"
		}
		return this._ajax('post',option);
	}
	_ajax(method,options){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if(r.data.code != 1000) {
					askDialogToast({msg:r.data.message? r.data.message:'接口请求失败',time:2000,class:'danger'});
					return;
				}
			}
		});
	}
}

export class DeviceSet{
	lockTimeList(opt){
		let options = {
			"access_token": opt.auth,
			"method":"device.timelimitlist",
			"page" : opt.page,
			"imei": opt.imei
		}
		return this._ajax('post',options);
	}
	addLockTime(opt){
		let options = {
			"access_token": opt.auth, 
			"imei": opt.imei, 
			"name" : opt.name,
			"start_time": opt.start, 
			"end_time": opt.end, 
			"method": "device.timelimit"
		}
		return this._ajax('post',options);
	}
	delLockTime(opt){
		let options = {
			"access_token": opt.auth,
			"method":"timelimit.del",
			"id" : opt.id
		}
		return this._ajax('post',options);
	}
	areaList(opt){
		let options = {
			"access_token": opt.auth,
			"method":"device.arealimitlist",
			"page" : opt.page,
			"imei": opt.imei
		}
		return this._ajax('post',options);
	}
	addAreaList(opt){
		let options = {
			"access_token": opt.auth, 
			"imei": opt.imei, 
			"lnglats": opt.lnglats, 
			"name": opt.name, 
			"lng": opt.lng, 
			"lat": opt.lat, 
			"address": opt.address,
			"method": "device.arealimit"
		}
		return this._ajax('post',options);
	}
	delAreaList(opt){
		let options = {
			"access_token": opt.auth,
			"method":"arealimit.del",
			"id" : opt.id
		}
		return this._ajax('post',options);
	}

	setManualLock(opt){
		let options = {
			"access_token": opt.auth,
			"method":"device.lock",
			"imei": opt.imei
		}
		return this._ajax('post',options);
	}
	setRemoteAuth(opt){
		let options = {
			"access_token": opt.auth,
			"method":"device.authorize",
			"imei": opt.imei
		}
		return this._ajax('post',options);
	}
	setIntervalInfo(opt){
		let options = {
			"access_token": opt.auth, 
			"imei":  opt.imei, 
			"set01": opt.pos, 
			"set02": opt.pol, 
			"method": "set.device"
		}
		return this._ajax('post',options);
	}

	recordList(opt){
		let options = {
			"access_token": opt.auth,
			"method":"web.devicelog",
			"page" : opt.page,
			"imei": opt.imei,
			"type": opt.type || "",
			"username": opt.username || ""
		}
		return this._ajax('post',options);
	}
	userInfoList(opt){
		let options = {
			"access_token": opt.auth,
			"method":"web.deviceuser",
			"page" : opt.page,
			"imei": opt.imei
		}
		return this._ajax('post',options);
	}
	addUserInfo(opt){
		let options = {
			"access_token": opt.auth,
			"method":"web.adduser",
			"imei": opt.imei,
			"username": opt.username, 
			"password": opt.password, 
			"group_id": opt.type
		}
		return this._ajax('post',options);
	}
	delUserInfo(opt){
		let options = {
			"access_token": opt.auth,
			"method":"device.delete",
			"bind_id": opt.id
		}
		return this._ajax('post',options);
		
	}
	boxList(opt){
		let options = {
			"access_token": opt.auth,
			"method":"goods.list",
			"page" : opt.page,
			"imei": opt.imei
		}
		return this._ajax('post',options);
	}
	boxHis(opt){
		let options = {
			"access_token": opt.auth,
			"method":"goods.his",
			"page" : opt.page,
			"imei": opt.imei
		}
		return this._ajax('post',options);
	}
	_ajax(method,options){
		options = options || {};
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				/*if(r.data.code != 1000) {
					askDialogToast({msg:r.data.message? r.data.message:'接口请求失败',time:2000,class:'danger'});
					return;
				}*/
			}
		});
	}
}