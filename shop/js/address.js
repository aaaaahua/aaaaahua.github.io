new Vue({
	el: ".address",
	data: {
		addressList: [],
		limitNum: 3,
		currentIndex: 0,
		shoppingWay:1


	},
	mounted() {
		this.$nextTick(function() {
			this.getAddressList();
		})
	},
	computed: {
		addressListByLimit() {
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods: {
		getAddressList() {
			this.$http.get("data/address.json").then((res) => {
				this.addressList = res.data.result;
			})
		},
		setDefaultAddress(thisAddressId) {
			this.addressList.forEach((item,index) => {
				if(thisAddressId == item.addressId) {
					item.isDefault = true;
				} else {
					item.isDefault = false;
				}
			})
		}
	}
})