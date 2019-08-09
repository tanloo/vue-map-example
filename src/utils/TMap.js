export default {
    init: function () {
        return new Promise((resolve) => {
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