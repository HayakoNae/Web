<template>
  <div class="mod-home">
    <h3>项目介绍</h3>
    <ul>
      <li><h3>接口调用</h3></li>
			<li><h4>已调用接口</h4></li>
			<li><span style="color: red;">login：</span>https://blog-server-api.amarea.cn/user/login</li>
			<li><span style="color: red;">newBlog：</span>https://blog-server-api.amarea.cn/post/newPost</li>
			<li><span style="color: red;">bloglist：</span>https://blog-server-api.amarea.cn/post/getList</li>
			<li><span style="color: red;">getBlog：</span>https://blog-server-api.amarea.cn/post/getPost</li>
			<li><span style="color: red;">editBlog：</span>https://blog-server-api.amarea.cn/post/editPost</li>
			<li><span style="color: red;">deleteBlog：</span>https://blog-server-api.amarea.cn/post/deletePost</li>
			<li><span style="color: red;">getuserInfo：</span>https://blog-server-api.amarea.cn/user/getInfo</li>
			<li><span style="color: red;">tokenverify：</span>https://blog-server-api.amarea.cn/user/verify</li>
			<li><span style="color: red;">getComment：</span>https://blog-server-api.amarea.cn/post/getComment</li>
			<li><span style="color: red;">getHotList：</span>https://blog-server-api.amarea.cn/post/getHotList</li>
      
    </ul>
  </div>
</template>

<script>
  export default {
	  activated() {
	  	this.checkToken();	// 校验token，或者是否登录过期
	  },
	  methods:{
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
	  }
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>

