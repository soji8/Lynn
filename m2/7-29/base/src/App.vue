<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">文章1</router-link>
			<!-- 子应用 vue app -->
			<router-link to="/content2">文章1</router-link>
			<router-link to="/content3">文章2</router-link>
		</div>
		<div id="main_content">
			<router-view/>
			<!-- 子应用容器 -->
			<div id="app1"></div>
			<div id="app2"></div>
		</div>
  	</div>
</template>

<style>
* {
	padding: 0;
	margin: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	display: flex;
	height: 100vh;
}

#nav {
	width: 100px;
	padding: 30px;
	border-right: 1px solid #000;
}

#nav a {
	display: block;
	padding: 10px 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #000;
	font-weight: bold;
	color: #2c3e50;
	text-decoration: none;
}

#nav a.router-link-exact-active {
  	color: #42b983;
}

#main_content {
	flex: 1;
}
</style>
