new Vue({
	el: "#app",
	data: {
		productList: [],
		totalMoney: 0,
		checkAllFlag: false,
		delFlag:false,
		delOneProduct:'',
	},
	filters: {
		formatMoney(value) {
			return "￥" + value.toFixed(2);
		}
	},
	mounted() {
		this.cartView();

	},
	methods: {
		cartView() {
			this.$http.get("data/cartData.json", {
				"id": 123
			}).then((res) => {
				this.productList = res.data.result.list;
				//				this.totalMoney = res.data.result.totalMoney;
			})
		},
		changeMoney(product, way) {
			if(way > 0) {
				product.productQuantity++;
				this.calculationMoney();
			} else {
				product.productQuantity--;
				this.calculationMoney();
			}
		},
		selectChecked(item) {
			if(typeof(item.checked) == 'undefined') {
				Vue.set(item, 'checked', true); //添加在哪，添加的属性，属性的值
			} else {
				if(item.checked == false) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			}
			this.calculationMoney();
		},
		checkAll(flag) {
			if(flag == true) {
				this.checkAllFlag = true;
				this.totalMoney=0;
				this.productList.forEach((value) => {
					value.checked = true
				})
			} else {
				this.checkAllFlag = false;
				this.productList.forEach((value) => {
					value.checked = false;
				})
			}
			this.calculationMoney();
		},
		calculationMoney() {
			this.totalMoney=0;
				this.productList.forEach((value) => {
						if(value.checked==true){
						this.totalMoney += value.productPrice * value.productQuantity;							
						}
				})
		},
		delProduct(item){
			this.delFlag=true;
			this.delOneProduct=item;
		},
		confirmDel(){
			let index_=this.productList.indexOf(this.delOneProduct);
			this.productList.splice(index_,1);
			this.delFlag=false;
		}
	}
});
Vue.filter("money", (value, type) => {
	return "￥" + value.toFixed(2) + type;
})