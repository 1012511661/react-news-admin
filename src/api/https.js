/*
 * @Author:author
 * @Date: 2021-08-02 15:42:25
 * @describe:
 */

import axios from 'axios';
// import * as commonConfig from "../common/config";
// const baseURL = "https://www.fastmock.site/mock/4703481d35d40c6cd66743c7fbd7209e/react";
const baseURL = 'http://localhost:9633/';

const instance = axios.create({
	baseURL,
	timeout: 60000,
});

instance.interceptors.request.use(
	(config) => {
		// if (TOKEN_SESSION.getValue()) {
		//     config.headers.common['Authorization'] = '1111111111';
		// }
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * get请求
 * @param {*} url     请求地址
 * @param {*} params
 */
export function get(url, params = {}) {
	return instance.get(url, {params});
}

/**
 * post请求
 * @param {*} url     请求地址
 * @param {*} data
 */
export function post(url, data) {
	return instance.post(url, data);
}

/**
 * put请求
 * @param {*} url     请求地址
 * @param {*} data
 */
export function put(url, data) {
	return instance.put(url, data);
}

/**
 * patch请求
 * @param {*} url     请求地址
 * @param {*} data
 */
export function patch(url, data) {
	return instance.patch(url, data);
}

/**
 * delete请求
 * @param {*} url
 */
export function del(url) {
	return instance.delete(url);
}
