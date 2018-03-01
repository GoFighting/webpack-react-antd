const params = (options) => {
    let paramString = ''
    for (var i in options) {
        paramString += i + '=' + options[i] + '&'
    }
    return paramString.slice(0, -1)
}
export function get(options, url, cb) {
    if (url.substring(url.length - 1) !== '?') {
        url += '?'
    }
    fetch(encodeURI(url) + params(options), {
        credentials: "include",
        header: {
            'Cache-Control': 'no-cache'
        }
    }).then((response) => {
        if (/login/.test(response.url)) {
            browserHistory.push('/login')
            return
        }
        return response.json()
    }).then((responseData) => {
        cb(responseData)
    }).catch((responseData) => {
        cb(responseData)
    });
}
/*
 * 模拟表单提交
 */
export function post(options, url, cb) {
    let formData = new FormData()
    for (let item in option) {
        formData.append(item, option[item])
    }
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: "include", // 请求带cookie
        header: {
            'Cache-Control': 'no-cache' // 不缓存
        }
    }).then((response) => {
        return response.json()
    }).then((responseData) => {
        cb(responseData)
    }).catch((responseData) => {
        cb(responseData)
    });
}