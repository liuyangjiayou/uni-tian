export default{
    data(){
        return {
            //设置默认的分享参数
            //如果页面不设置share，就触发这个默认的分享
            shareInfo:{
                title:'share测试',
                path:'/pages/index/index',
                imageUrl:'',
                desc:'',
                content:''
            },
        };
    },
    onShareAppMessage(res) {
        return {
            title:this.shareInfo.title,
            path:this.shareInfo.path,
            imageUrl:this.shareInfo.imageUrl,
            desc:this.shareInfo.desc,
            content:this.shareInfo.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
}