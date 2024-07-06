<template>
  <div>
    <el-upload :action="uploadUrl"
               :before-upload="handleBeforeUpload"
               :on-success="handleUploadSuccess"
               name="file"
               :on-error="handleUploadError"
               :show-file-list="false"
               class="editor-img-uploader"
               accept=".jpeg,.jpg,.png">
      <i ref="uploadRef"
         class="Plus editor-img-uploader"></i>
    </el-upload>
    <div class="editor">
      <QuillEditor id="editorId"
                   ref="myQuillEditor"
                   v-model="editorContent"
                   :contentType="html"
                   @update:content="onContentChange"
                   :options="options" />
    </div>
    <el-row style="margin-top: 5px;">
      <el-button type="success" @click="review">发表评论</el-button>
      <el-button type="info" @click="clear">清除</el-button>
    </el-row>
  </div>
</template>

<script>
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import './quill'
// 引入缩放图片的插件
import BlotFormatter from 'quill-blot-formatter'

Quill.register('modules/blotFormatter', BlotFormatter)

export default {
  components: {
    QuillEditor,
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    fileSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    let vue = this
    return {
      editorContent: this.content,
      myQuillEditor: null,
      uploadUrl: 'http://localhost:8080/review/imageUpload', // 替换为实际的上传 URL
      oldContent: '',
      options: {
        theme: 'snow',
        debug: 'warn',
        modules: {
          blotFormatter: true,
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image'],
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  vue.$refs.uploadRef.click()
                } else {
                  Quill.format('image', true)
                }
              },
            },
          },
        },
        placeholder: '请输入评论内容...',
        readOnly: this.readOnly,
        clipboard: {
          matchers: [
            [
              'img',
              (node, delta) => {
                const src = node.getAttribute('src')
                const id = node.getAttribute('id')
                delta.insert({ image: { src, id: id } })
              },
            ],
          ],
        },
      },
      titleConfig: [
        { Choice: '.ql-insertMetric', title: '跳转配置' },
        { Choice: '.ql-bold', title: '加粗' },
        { Choice: '.ql-italic', title: '斜体' },
        { Choice: '.ql-underline', title: '下划线' },
        { Choice: '.ql-header', title: '段落格式' },
        { Choice: '.ql-strike', title: '删除线' },
        { Choice: '.ql-blockquote', title: '块引用' },
        { Choice: '.ql-code', title: '插入代码' },
        { Choice: '.ql-code-block', title: '插入代码段' },
        { Choice: '.ql-font', title: '字体' },
        { Choice: '.ql-size', title: '字体大小' },
        { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
        { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
        { Choice: '.ql-direction', title: '文本方向' },
        { Choice: '.ql-header[value="1"]', title: 'h1' },
        { Choice: '.ql-header[value="2"]', title: 'h2' },
        { Choice: '.ql-align', title: '对齐方式' },
        { Choice: '.ql-color', title: '字体颜色' },
        { Choice: '.ql-background', title: '背景颜色' },
        { Choice: '.ql-image', title: '图像' },
        { Choice: '.ql-video', title: '视频' },
        { Choice: '.ql-link', title: '添加链接' },
        { Choice: '.ql-formula', title: '插入公式' },
        { Choice: '.ql-clean', title: '清除字体格式' },
        { Choice: '.ql-script[value="sub"]', title: '下标' },
        { Choice: '.ql-script[value="super"]', title: '上标' },
        { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
        { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
        { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
        {
          Choice: '.ql-header .ql-picker-item[data-value="1"]',
          title: '标题一',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="2"]',
          title: '标题二',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="3"]',
          title: '标题三',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="4"]',
          title: '标题四',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="5"]',
          title: '标题五',
        },
        {
          Choice: '.ql-header .ql-picker-item[data-value="6"]',
          title: '标题六',
        },
        { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
        {
          Choice: '.ql-size .ql-picker-item[data-value="small"]',
          title: '小号',
        },
        {
          Choice: '.ql-size .ql-picker-item[data-value="large"]',
          title: '大号',
        },
        {
          Choice: '.ql-size .ql-picker-item[data-value="huge"]',
          title: '超大号',
        },
        { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
        { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
        {
          Choice: '.ql-align .ql-picker-item[data-value="center"]',
          title: '居中对齐',
        },
        {
          Choice: '.ql-align .ql-picker-item[data-value="right"]',
          title: '居右对齐',
        },
        {
          Choice: '.ql-align .ql-picker-item[data-value="justify"]',
          title: '两端对齐',
        },
      ],
    }
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg']
      const isJPG = type.includes(file.type)
      //检验文件格式
      if (!isJPG) {
        this.$message.error(`图片格式错误！只能上传jpeg/jpg/png格式`)
        return false
      }
      return true
    },
    onContentChange(content) {
      this.$emit('update:content', content)
    },
    // 上传成功处理
    handleUploadSuccess(res, file) {
      // 如果上传成功
      console.log(res)
      if (res.code == 200) {
        let rawMyQuillEditor = this.myQuillEditor
        // 获取富文本实例
        let quill = rawMyQuillEditor.getQuill()
        // 获取光标位置
        let length = quill.selection.savedRange.index
        // 插入图片，res为服务器返回的图片链接地址
        const imageUrl = res.data
        const imageId = (Math.random() * 100).toFixed(0)
        quill.insertEmbed(length, 'image', {
          url: imageUrl,
          id: imageId,
        })

        quill.setSelection(length + 1)
        this.$emit('getFileId', imageId)
      } else {
        this.$message.error('图片插入失败')
      }
    },
    // 增加hover工具栏有中文提示
    handleUploadError() {
      this.$message.error('图片插入失败')
    },
    // 增加hover工具栏有中文提示
    initTitle() {
      document.getElementsByClassName('ql-editor')[0].placeholder = ''
      for (let item of this.titleConfig) {
        let tip = document.querySelector('.ql-toolbar ' + item.Choice)
        if (!tip) continue
        tip.setAttribute('title', item.title)
      }
    },
    review(){
      let editor = document.getElementsByClassName('ql-editor')[0]
      let text = editor.innerHTML
      if(text.endsWith("<p><br></p>")){
        text = text.substring(0,text.indexOf("<p><br></p>"))
      }
      this.$emit("review", text)
      // 清空数据
      editor.innerHTML = ""
    },
    clear(){
      document.getElementsByClassName('ql-editor')[0].innerHTML = ""
    }
  },
  mounted() {
    this.initTitle()
    this.oldContent = this.content
    this.myQuillEditor = this.$refs.myQuillEditor
  },
}
</script>
<style>
@import url('./editor.css');
</style>
