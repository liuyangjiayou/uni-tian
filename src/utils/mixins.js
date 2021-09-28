import {getInfo} from "../api";

export const launchOrload = {
    created() {
        if (getApp().globalData.onLaunchEnd) {
            this.launchEnd && this.launchEnd()
        } else {
            getApp().pageCallback = res => {
                this.launchEnd && this.launchEnd()
            };
        }
    },
}
