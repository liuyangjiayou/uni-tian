import {settings, voteFn} from "@/api";

export default {
    methods: {
        async voteSubmit(id) {
            return new Promise(async resolve => {
                const config = await settings();
                const voteMax = config?.setting?.vote_num || 0;
                const voteInfo = uni.getStorageSync('vote');
                const ling = new Date(new Date().toLocaleDateString()).getTime(); // 今天零点
                const currentCount = voteInfo?.time && voteInfo.time > ling ? (voteInfo?.count || 0) : 0;
                console.log('已经投了', currentCount, '最大投票次数', voteMax);
                if (currentCount >= voteMax) {
                    // #ifdef MP_WEIXIN
                    uni.showModal({
                        title: '提示',
                        content: `您可在冀云客户端再进行${voteMax}次投票！`,
                        showCancel: false
                    });
                    // #endif
                    // #ifdef H5
                    uni.showModal({
                        title: '提示',
                        content: `您可在职工云上运动会小程序再进行${voteMax}次投票！`,
                        showCancel: false
                    });
                    // #endif
                    // uni.showToast({title: `已达到最大投票次数${voteMax}次！`, icon: 'none', duration: 3000, mask: true});
                    return;
                }
                // uni.showLoading({title: '', mask: true});
                let type = 2;
                // #ifdef MP_WEIXIN
                type = 1;
                // #endif
                voteFn({rank_id: id, type}).then(res => {
                    uni.setStorageSync('vote', {time: Date.now(), count: currentCount + 1});
                    console.log('投票成功，用掉次数', currentCount + 1);
                    this.$emit('add-vote');
                    uni.showModal({
                        title: '提示',
                        content: `投票成功！`,
                        showCancel: false
                    });
                    resolve(currentCount + 1);
                }).finally(() => {
                    // uni.hideLoading();
                });
            });

        },
    },
}