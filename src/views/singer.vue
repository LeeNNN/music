<template>
  <div class="singer" ref="singer">
    <m-scroll class="listview" ref="listview" :data="singerList">
      <!-- 歌手列表 -->
      <ul>
        <li v-for="(group,index) in singerList" class="list-group" ref="listGroup" :key="index">
          <h2 class="list-group-title">{{ group.title }}</h2>
          <ul>
            <li v-for="(item,index) in group.items" class="list-group-item" :key="index">
              <img class="avatar" :src="item.headImg" />
              <span class="name">{{ item.sname }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 检索列表 -->
      <div class="list-shortcut">
        <ul>
          <li
            v-for="(item, index) in getCheckIndex"
            @click="scrollTo(index)"
            :key="index"
          >{{ item }}</li>
        </ul>
      </div>
    </m-scroll>
  </div>
</template>

<script>
import { getSingerList } from "../api/singer.js";
import { Data_OK } from "../common/js/config.js";
import MScroll from "../components/m-scroll.vue";
export default {
  data() {
    return {
      singerList: []
    };
  },
  components: {
    MScroll
  },
  computed: {
    getCheckIndex() {
      return this.singerList.map((obj, index) => {
        return obj.title.slice(0, 1);
      });
    }
  },
  methods: {
    //获取歌手列表
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === Data_OK) {
          this.singerList = this.filterSingerList(res.data.list);
        }
      });
    },
    //处理歌手列表方法
    filterSingerList(list) {
      let map = {
        hot: {
          title: "热门",
          items: []
        }
      };
      //处理歌手列表取前十条为热门
      list.forEach((singer, index) => {
        if (index < 10) {
          map.hot.items.push({
            Fmid: singer.Fsinger_mid,
            sname: singer.Fsinger_name,
            headImg: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${singer.Fsinger_mid}.jpg?max_age=2592000`
          });
        }
        //获取A~Z Findex
        let key = singer.Findex;
        if (!map[key]) {
          //如果map里没有对应的key,就创建一个
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push({
          Fmid: singer.Fsinger_mid,
          sname: singer.Fsinger_name,
          headImg: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${singer.Fsinger_mid}.jpg?max_age=2592000`
        });
      });

      //把map对象转化成 有序数组, [热门 A B C ...]
      let hot = [];
      let ret = [];
      for (let item in map) {
        if (map[item].title == "热门") {
          hot.push(map[item]);
        } else if (map[item].title.match(/[a-zA-Z]/)) {
          ret.push(map[item]);
        }
      }
      //把ret进行排序
      ret.sort(function(a, b) {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0); // 把字符串转化成Unicode码再比较
      });
      return hot.concat(ret);
    },

    //点击字母快速检索
    scrollTo(index) {
      //滚动到检索下标对应的列表
      let currentList = this.$refs.listGroup[index];
      //调用MScroll实例上的scrollToElement方法
      this.$refs.listview.scrollToElement(currentList, 500);
    }
  },
  created() {
    this._getSingerList();
  }
};
</script>

<style scoped lang="stylus">
@import '../common/stylus/variable';

.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;

  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }

  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;

    .list-group {
      padding-bottom: 30px;

      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: #f2f2f2;
      }

      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;

        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium-x;
        }
      }
    }

    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: rgba(200, 200, 200, 0.1);
      font-family: Helvetica;

      .item {
        padding: 3px;
        line-height: 1;
        color: #333;
        font-size: $font-size-small;

        &.current {
          color: $color-theme;
        }
      }
    }

    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      .fixed-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
    }

    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(100%);
    }
  }
}
</style>
