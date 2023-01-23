<template>
	<div>
		<div class="leftMenu">
			<li style="margin-top: 10px;">保存</li>
			<li style="margin-top: 10px;">预览</li>
			<li style="margin-top: 10px;" @click="updateArticle">发布</li>
		</div>

		<div id="editor">
			<div>
				<p>文章标题</p>
				<input type="text" v-model="push.title">
			</div>
			<mavon-editor v-model="push.text" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" style="height: 600px;" />
		</div>

	</div>
</template>

<script>
	export default {
		name: 'editor',
		data() {
			return {
				push: {
					text: "",
					title: ""
					// articleDescription: "",
					// articleFlag: 0,
					// articleId: 0,
					// articleImgUrl: "",

					// classifyIdList: [
					//     1
					// ],
					// collectStatus: true,
					// commentStatus: true,
					// starStatus: true
				}
			}
		},
		components: {
			// mavonEditor
			// or 'mavon-editor': mavonEditor
		},
		
		activated () {
		  this.checkToken()
		},
		methods: {
			
			// 校验token
			checkToken(){
				if (this.$cookie.get('token') == null || this.$cookie.get('token') == '') {
					alert("请先登录！！");
					this.$router.replace({
						name: 'login'
					})
				} else {
					this.$http({
						url: this.$http.adornUrl('https://blog-server-api.amarea.cn/user/verify'),
						method: 'post',
						data: this.$http.adornData({
							'token': this.$cookie.get('token'),
							'uid': this.$cookie.get('id')
						})
					}).then((url) => {
						console.log("refrushToken",url);
						if (url.data.code != 0) {
							alert("登录已过期，请重新登录！！");
							this.$router.replace({
								name: 'login'
							})	
						} 
					})
				}
			},

			imgAdd(pos, $file) {
				let formdata = new FormData()
				formdata.append('file', $file)
				this.$axios({
					url: '/file/upload',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data;charset=UTF-8',
						'aaa': 'aaa'
					},
				}).then((url) => {
					// 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
					//    this.$vm.$img2Url(pos, url.data);
					this.$refs.md.$img2Url(pos, url.data);
				})
			},
			imgDel(pos) {
				delete this.imgFile[pos]
			},
			updateArticle() {
				var add = {
					text: "",
					title: "",
					token: "",
					// articleDescription: "",
					// articleFlag: 0,
					// articleImgUrl: "",
					// classifyIdList: [
					//     1
					// ],
					// collectStatus: true,
					// commentStatus: true,
					// starStatus: true
				}
				add.text = this.push.text
				add.title = this.push.title
				add.token = this.$cookie.get('token')
				// add.articleDescription = this.push.articleDescription
				// add.articleFlag = this.push.articleFlag
				// add.articleImgUrl = this.push.articleImgUrl
				// add.classifyIdList = this.push.classifyIdList
				// add.collectStatus =  this.push.collectStatus
				// add.commentStatus = this.push.commentStatus
				// add.starStatus = this.push.starStatus
				// document.cookie="user_info=1;path = /"
				console.log("add", add);
				this.$http({
					url: this.$http.adornUrl('https://blog-server-api.amarea.cn/post/newPost'),
					method: 'post',
					data: add
				}).then((url) => {
					if (url.data.Result == 1) {
						alert(url.data.Message)
					} else {
						alert(url.data.Message)
					}
				})

			}

		}
	}
</script>

<style scoped>
	.leftMenu {
		float: left;
		height: 100%;
	}

	#editor {
		margin: auto;
		padding: 10px auto;
		width: 70%;
		height: 100%;
	}
</style>
