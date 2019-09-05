<template>
    <div ref="wrapper"> 
        <!-- 插槽 -->
        <slot>
            
        </slot>
    </div>
</template>

<script>
import BScroll from "@better-scroll/core";
export default {
    props: {
        probeType: {
            type: Number,
            //default有三个值 1 2 3
            //1: 非实时派发scroll事件
            //2: 实时派发scroll事件
            //3： 动画运行中也派发scroll事件        
            default: 1
        },
        data: {//监听数据变化
            type: Array,
            default(){
                return []
            }
        }
    },
    methods: {
        _initScroll(){
            if(!this.$refs.wrapper){
                return;
            }
            //实例化scroll对象,new BScroll(DOM,options[Object])
            this.scroll= new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: true, //开启点击事件
                momentum: true,//开启滚动动画
                swipeTime: 1500, //滚动动画时长 ms
                deceleration: 0.003 //滚动动画减速度
            })
        },
        enable(){ //启动better-scroll
            this.scroll && this.scroll.enable()
        },
        disable(){  //关闭better-scroll
            this.scroll && this.scroll.disable()
        },
        refresh(){ //重新生成实例
            this.scroll && this.scroll.refresh()
        },
        scrollToElement(elem, ms){
            this.scroll && this.scroll.scrollToElement(elem, ms) //elem--滚动到的元素  ms--滚动时间
        }
    },
    mounted(){
        setTimeout(()=>{ //延时加载,确保DOM加载完成
            this._initScroll()
        },20)
    },
    watch: {//监听data数据变化,重新计算高度
        data(){
            setTimeout(()=>{
                this.refresh()
            },20)
        }
    }
}
</script>

<style scoped>
    
</style>