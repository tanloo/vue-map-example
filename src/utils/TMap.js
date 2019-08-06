export default {
    init: function () {
        return new Promise((resolve) => {
            // debugger
            // 如果已加载直接返回
            // 如果已加载直接返回
            if (typeof window.T !== 'undefined') {
                resolve(window.T)
                return true
            }
            window.onload = function () {
                resolve(window.T)
            }
        })
    }
}