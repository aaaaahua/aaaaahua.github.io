new Vue({
	el: ".address", //在指定div內生效
	data: {
		//存放变量，在底下组件引用的时候记得加上this.
		a: 1,
		b[],
	},
	mounted() {
		//一打开页面就加载执行的函数放这里面
		tihs.$nextTick(function() {
			//放入函数方法名
			this.getAddressList();
		})
	},
	methods: {
		//存放html点击等调用的方法
		getAddressList() {
			//resoucers.js插件的使用方法
			this.$http.get("data/address.json").then((res) => {
				this.addressList = res.data.result;
			})
		},
		confirmDel(){
			//删除指定div的方法
			let index_=this.productList.indexOf(this.delOneProduct);
			this.productList.splice(index_,1);
			this.delFlag=false;
		}
	},
	filters: {
		//过滤数据，比如给json传来的数字添加小数点等
		formatMoney(value) {
			return "￥" + value.toFixed(2);
		}
	},
	watch: {
		//监听事件，比如监听ENTER键
		items: {
			handler: function(items) {
				Store.save(items);
			},
			deep: true
		},
	},
	computed: {
		//实时计算并返回数据
		addressListByLimit() {
			return this.addressList.slice(0, this.limitNum);
		}
	}
})