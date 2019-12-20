/**
 * 获取系统信息
 */
class SystemInfo {
  static fetchAllInfo() {
    const menuButton = mpvue.getMenuButtonBoundingClientRect()
    const systemInfo = mpvue.getSystemInfoSync()

    const statusBarHeight = systemInfo.statusBarHeight
    const headerHeight = (menuButton.top - systemInfo.statusBarHeight) * 2 + menuButton.height

    let data = {
      source: {
        menu: menuButton,
        system: systemInfo
      },
      statusBarHeight: statusBarHeight,
      headerHeight: headerHeight,
      headerRight: systemInfo.windowWidth - menuButton.left
    }

    mpvue.setStorageSync('SystemInfo', data)
    return data
  }

  static getInfo() {
    let storageInfoSync = mpvue.getStorageSync('SystemInfo')
    if (!storageInfoSync) {
      storageInfoSync = this.fetchAllInfo()
    }
    return storageInfoSync
  }
}

export default SystemInfo
