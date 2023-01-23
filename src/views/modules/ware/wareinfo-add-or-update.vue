<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="text">
      <el-input v-model="dataForm.text" placeholder="内容"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          pid: 0,
          title: '',
          text: ''
        },
        dataRule: {
          tile: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          text: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
		  // alert(id)
        this.dataForm.id = id
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
			  // alert(id)
            this.$http({
              url: this.$http.adornUrl(`https://blog-server-api.amarea.cn/post/getPost?pid=${id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
				console.log(data)
                this.dataForm.title = data.data.post.title
                this.dataForm.text = data.data.post.text
                // this.dataForm.areacode = data.wareInfo.areacode
              
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`https://blog-server-api.amarea.cn/post/editPost`),
              method: 'post',
              data: this.$http.adornData({
				'token': this.$cookie.get('token'),
                'pid': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'text': this.dataForm.text
              })
            }).then(({data}) => {
              // if (data && data.code === 0) {
              //   this.$message({
              //     message: '操作成功',
              //     type: 'success',
              //     duration: 1500,
              //     onClose: () => {
              //       this.visible = false
              //       this.$emit('refreshDataList')
              //     }
              //   })
              // } else {
              //   this.$message.error(data.msg)
              // }
			  
			  console.log("editblogData",data);
            })
          }
        })
      }
    }
  }
</script>
