export const launchOrload = {
    onLoad() {
        if (getApp().globalData.onLaunchEnd) {
            this.launchEnd && this.launchEnd()
        } else {
            getApp().pageCallback = res => {
                this.launchEnd()
            };
        }
    }
}
