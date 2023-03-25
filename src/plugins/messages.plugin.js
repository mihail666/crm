export default {
  install (app) {
    app.config.globalProperties.$message = function (html) {
      this.$wkToast(html, {
        className: ['wk-wrapper'],
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 2000,
        transition: 'transition'
      })
    }
    app.config.globalProperties.$com = function (html) {
      this.$wkToast(html, {
        className: ['wk-wrapper', 'wk-warn'],
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 3000,
        transition: 'transition'
      })
    }
    app.config.globalProperties.$error = function (html) {
      this.$wkToast(html, {
        className: ['wk-alert', 'wk-wrapper'],
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 9000,
        transition: 'transition'
      })
    }
  }
}
