import store from '../store'
export default function (options) {
    if (!options.url) return Error('请求地址不能为空');
    uni.showLoading({
        title: options.title ?? '加载中'
    });
    return new Promise((resolve, reject) => {
        const baseUrl = 'https://atestydh.zhyell.com/api';
        const header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        if (store.getters.token) {
            header.Authorization = `Bearer ${store.getters.token}`
            header.Authorization = `Bearer ${store.getters.token}`
        }
        uni.request({
            url: `${baseUrl}${options.url}`,
            data: options.data ?? {},
            method: 'POST',
            timeout: 60000,
            header,
            // 请求成功
            success({ data, statusCode, header, cookies}) {
                if (data.code === 0) {
                    return resolve(data.data);
                }
                uni.showToast({
                    title: data.msg,
                    duration: 3000, mask: true
                });
                reject({ data, statusCode, header, cookies})
            },
            // 请求失败
            fail (err) {
                reject(err)
            },
            // 成功失败都会调用
            complete () {
                uni.hideLoading();
                options.complete && options.complete();
            }
        })
    })
}
