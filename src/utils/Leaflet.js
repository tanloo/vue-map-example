export default {
    init: function () {
        return new Promise((resolve) => {
            if (typeof window.L !== 'undefined') {
                resolve(window.L)
                return true
            }
            window.onload = function () {
                resolve(window.L)
            }
        })
    }
}