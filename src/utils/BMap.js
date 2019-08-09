export default {
    init: function () {
        return new Promise((resolve) => {
            if (typeof window.BMap !== 'undefined') {
                resolve(window.BMap)
                return true
            }
            window.onload = function () {
                resolve(window.BMap)
            }
        })
    }
}