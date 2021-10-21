import store from '../store'
export default function (options) {
    if (!options.url) return Error('请求地址不能为空');
    uni.showLoading({
        title: options.title ?? '加载中'
    });
    return new Promise((resolve, reject) => {
        const baseUrl = 'https://aysydh.hebei.com.cn/api';
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
            method: options.method || 'POST',
            timeout: 60000,
            header,
            // 请求成功
            success({ data, statusCode, header, cookies}) {
                if (data.code === 0) {
                    return resolve(data.data);
                }
                setTimeout(() => {
                    // uni.showToast({
                    //     title: data.msg,
                    //     icon: 'error',
                    //     duration: 3000,
                    //     mask: true
                    // });
                    uni.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    });
                })

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
