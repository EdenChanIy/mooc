<!-- 课程笔记 -->
<template>
  <div class="notes-wrapper">
    <div class="notes-header clearfix">
      <span :class="Number(sortingType) === 0 ? 'sorting-type-on' : 'sorting-type'"
            @click="sorting(0)">最新</span>
      <span :class="Number(sortingType) === 1 ? 'sorting-type-on' : 'sorting-type'"
            @click="sorting(1)">最热</span>
      <div class="mine">
        <el-switch
          v-model="mine"
          active-color="#13ce66"
          @change="showMine">
        </el-switch>
        <span>只看自己</span>
      </div>
    </div>
    <div class="notes">
      <div class="note-item clearfix"
           v-for="(item, index) in notes" :key="index"
           @click="noteDetail(item.id)">
        <div class="note-item-wrapper">
          <div class="creator-icon">
            <img :src="item.creator.avatar"/>
          </div>
          <div class="content">
            <div class="creator line-limit">{{item.creator.name}}</div>
            <div class="content-title line-limit">
              {{item.title}}
            </div>
            <div class="content-footer">
              <span>回复数 {{item.replyCount}}</span>
              <span>浏览数 {{item.pageViews}}</span>
              <span>关注人数 {{item.likeCount}}</span>
            </div>
          </div>
          <div class="aside">
            <div class="publish-time">{{item.createTime}}</div>
            <div class="binding-session line-limit" v-if="item.createPosition"
                 @click.stop="playVideo(item.createPosition.cid, item.createPosition.chapter, item.createPosition.sid)">
              {{`${item.createPosition.chapter}-${item.createPosition.sid} ${item.createPosition.sessionName}`}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="notesNum"
        :current-page="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { NOTES } from './js/NOTES'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'notes',
    data () {
      return {
        // 当前页
        currentPage: 1,
        // 当前条件下的总笔记数
        notesNum: 0,
        pageSize: 5,
        // 笔记列表
        notes: [],
        // 排序规则：0->最新, 1->最热
        sortingType: 0,
        // 是否只看自己的笔记
        mine: false
      }
    },
    methods: {
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      // 当前页变化
      handleCurrentChange (page) {
        this.handleRoute(page, this.sortingType)
      },
      // 笔记页的路由逻辑处理
      handleRoute (page, sortingType) {
        page = String(page)
        sortingType = String(sortingType)
        if (this.mine) {
          this.$router.push({
            name: 'notes',
            params: this.$route.params,
            query: { p: page, type: sortingType, filter: 'mine' }
          })
        } else {
          this.$router.push({
            name: 'notes',
            params: this.$route.params,
            query: { p: page, type: sortingType }
          })
        }
      },
      // 展示自己的笔记
      showMine () {
        console.log(`mine is ${this.mine}`)
        if (!this.userInfo) {
          this.mine = false
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.handleRoute('1', this.sortingType)
        }
      },
      // 后台获取笔记
      getNotes () {
        this.currentPage = Number(this.$route.query.p) || 1
        this.sortingType = Number(this.$route.query.type) || 0
        this.mine = this.$route.query.filter === 'mine'
        console.log(`sotring type is ${this.sortingType}`)
        console.log(`this.$route.query.filter === 'mine'? ${this.mine}`)
        // 后台获取笔记
        if (this.mine) {
          // 获取自己的笔记
          // ...post({cid: this.$route.params.cid, currentPage: this.currentPage, pageSize: this.pageSize, sortingType
          // type: 'mine', uid, token})
        } else {
          // 获取所有笔记
          // ...post({cid: this.$route.params.cid, currentPage: this.currentPage, pageSize: this.pageSize, sortingType})
        }
        this.notes = NOTES.notes
        this.notesNum = NOTES.notesNum
      },
      // 更改讨论列表排序规则
      sorting (sortingType) {
        if (this.sortingType !== sortingType) {
          this.handleRoute('1', sortingType)
        }
      },
      // 前往笔记详情页
      noteDetail (id) {
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          // 前往详情页
          this.$router.push({ name: 'noteDetail', params: { nid: id } })
        }
      },
      // 前往课时播放页
      playVideo (cid, chapter, sid) {
        // 未登录时无法播放课程，弹出登录窗口提示登录
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.$router.push({
            name: 'courseVideo',
            params: {
              cid: cid,
              chapter: chapter,
              sid: sid
            }
          })
        }
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.getNotes()
      }
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    },
    created () {
      this.getNotes()
    }
  }
</script>

<style lang="stylus" scoped>
  .notes-wrapper
    .notes-header
      margin-bottom 30px

      .sorting-type-on
        font-weight 700

      .sorting-type
        &:hover
          cursor pointer
          color grey

      span
        padding-left 5px

      .mine
        float right
        display inline-block

    .notes
      .note-item
        padding 32px
        border silver solid 1px
        margin-bottom 8px

        &:hover
          background-color silver
          cursor pointer

        .note-item-wrapper
          position relative
          top 0
          left 0

          .creator-icon
            float left

            img
              width 48px
              height 48px
              border-radius 100%

          .content
            padding-right 120px
            .content-footer
              font-size 12px

              span
                padding-right 5px

          .aside
            position absolute
            top 0
            right 0
            width 120px

            .binding-session
              cursor pointer

              &:hover
                color #ffff

    .pagination
      text-align center
</style>
