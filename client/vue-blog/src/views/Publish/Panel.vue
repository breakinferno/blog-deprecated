<template>
    <div id="publish-panel">
        <div class="title">发布文章</div>
        <div class="category-box">
            <div class="sub-title">分类</div>
            <div class="category-list">
                <div v-for="(category, index) in categories" class="item" :class="{active: categoryActiveItemsIndex.includes(index)}" :key="index" @click="active(index, 'categoryActiveItemsIndex')">{{category}}</div>
                <div class="category-add add-btn" @click="showAddCategory = true"><i class="el-icon-circle-plus-outline"></i></div>
            </div>
            <el-input placeholder="请输入类别" v-model="newCategory" class="add-input" v-show="showAddCategory">
                <el-button @click="addCategory" slot="append" type="success" icon="el-icon-check" circle></el-button>
            </el-input>
        </div>
        <div class="tags-box">
            <div class="sub-title">标签</div>
            <div class="tags-list">
                <div class="item" v-for="(tag, idx) in tags" :key="idx" :class="{active: tagActiveItemsIndex.includes(idx)}" @click="active(idx, 'tagActiveItemsIndex', true)">{{tag}}</div>
                <div class="tags-add add-btn" @click="showAddTag = true"><i class="el-icon-circle-plus-outline"></i></div>
            </div>
            <el-input placeholder="请输入标签" v-model="newTag" class="add-input" v-show="showAddTag">
                <el-button @click="addTag" slot="append" type="success" icon="el-icon-check" circle></el-button>
            </el-input>
        </div>
        <button class="publish-btn" @click="notifyParent">确认并发布</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { post } from '../../utils/request.js'

export default {
  name: 'PublishPanel',
  data () {
    return {
      categoryActiveItemsIndex: [],
      tagActiveItemsIndex: [],
      showAddCategory: false,
      showAddTag: false,
      newTag: '',
      newCategory: ''
    }
  },
  computed: {
    ...mapState(['tags', 'categories'])
  },
  methods: {
    ...mapMutations(['setCategories', 'setTags']),
    active (index, targetName, mutiple = false) {
      let target = this[targetName]
      // 可多选的
      if (mutiple) {
        return target.includes(index) ? target.splice(target.indexOf(index), 1) : target.push(index)
      } else {
        target.splice(0, 1)
        target.push(index)
      }
    },
    addCategory () {
      console.log(this.newCategory)
      post('/categories', {
        name: this.newCategory
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.setCategories([...this.categories, res.data.name])
          this.showAddCategory = false
          this.newCategory = ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addTag () {
      console.log(this.newTag)
      post('/tags', {
        name: this.newTag
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.setTags([...this.tags, res.data.name])
          this.showAddTag = false
          this.newTag = ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    notifyParent () {
      this.$emit('publish', {
        tags: this.tagActiveItemsIndex.map(idx => this.tags[idx]),
        category: this.categories[this.categoryActiveItemsIndex[0]]
      })
    }
  }
}
</script>

<style lang="less" scoped>
#publish-panel{
    position: absolute;
    margin: 12px 0px;
    padding: 20px 16px;
    top: 100%;
    right: 100px;
    width: 360px;
    white-space: nowrap;
    color: #909090;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 2px #f1f1f1;
    box-shadow: 0 1px 2px #f1f1f1;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 100;

    &::before{
        content: "";
        position: absolute;
        margin-left: -.5rem;
        top: -.6rem;
        left: 78%;
        width: 1rem;
        height: 1rem;
        background-color: #fff;
        border: 1px solid #ddd;
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
    }

    .title{
        margin-bottom: 1.5rem;
        font-size: 18px;
        font-weight: 700;
        color: hsla(218,9%,51%,.8);
    }
    .sub-title{
        margin-bottom: 1rem;
        font-size: 16px;
    }

    .add-btn{
        margin: 0 0.6rem 0.8rem 0;
        padding: 4px 10px;
        font-size: 16px;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #007fff
    }

    .add-input {

        & /deep/ .el-input__inner{
            border-top: none;
            border-left: none;
            border-right: none;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
        }

        & /deep/ .el-input-group__append{
            border: 1px solid #DCDFE6;
            border-radius: 4px;
        }
    }

    .item{
        display: inline-block;
        margin: 0 .6rem .8rem 0;
        padding: 6px 10px;
        font-size: 12px;
        white-space: nowrap;
        border: 1px solid #c7c7c7;
        border-radius: 2px;
        cursor: pointer;
        &:hover,
        &.active{
            color: #007fff;
            border-color: rgba(0,127,255,.15);
            background-color: rgba(0,127,255,.05);
        }
    }

    .category-box{
        margin-bottom: 1rem;

        .category-list{
            white-space: normal;
        }
    }

    .tags-box{
        margin-bottom: 1rem;
        .tags-list{
            white-space: normal;
        }
    }

    .publish-btn{
        display: block;
        margin: 0 auto;
        padding: .3rem .8rem;
        color: #007fff;
        background: #fff;
        border: 1px solid currentColor;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        transition: all .2s;
        font-size: 16px;
    }
}
</style>
