var app = new Vue({
	el: '#app',
	data: {
		main_url: "http://127.0.0.1:8000",
		info: null,
		tab: "reviews", //user, posts, community
		review_star_count: 0,
		review_review: "",
		review_firstname: "",
		user_name:"1314",
		user_password:"1414",
		user_email:"14124",
		openInfo: null,
		is_sum_wt: false,
		is_sum_size: false,
		sum_wt: 0,
		sum_size: 0,
		accordion_open: [false, false, false],
		rate: "",
		user: {
			name: "",
			age: "",
			orders: [
				{
					name: "",
					description: "",
					status: "",
				}
			]
		},
	},
	methods: {
		switchingPage(page) {
			this.tab = page;
		},
		setReview_star_count(value)
		{
			this.review_star_count = value;
		},
		// getTypeReview_star_count (value)
		// {
		// 	if (value <= this.review_star_count) return "★";
		// 	if (value > this.review_star_count) return "☆";
		// }
		setOpenInfo(value)
		{
			if (this.openInfo == value) this.openInfo = null;
			else this.openInfo = value;
		},
		async postRegisterUser() {
			// Default options are marked with *
			let data = {
				"name": this.user_name,
				"email": this.user_email,
				"password": this.user_password,
			}
			const response = await fetch(`${this.main_url}/api/user/register`, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *client
				body: JSON.stringify(data) // body data type must match "Content-Type" header
			});
			// return await response.json(); // parses JSON response into native JavaScript objects
		},
		async postReqReview() {
			// Default options are marked with *

			let data = {
				"stars": review_star_count,
				"review": review_review,
				"firstname": review_firstname,
			}

			const response = await fetch(`${this.main_url}/api/addreview`, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *client
				body: JSON.stringify(data) // body data type must match "Content-Type" header
			});
			return await response.json(); // parses JSON response into native JavaScript objects
		},
	},
	computed:
	{
		getPrice(){
			if (!(this.is_sum_wt && this.is_sum_size)) return "Не может быть отображена в реальном времени";
			if ((this.sum_wt <= 0 || this.sum_size <= 0)) return "Не может быть отображена в реальном времени";
			if (this.rate != "")
			switch(this.rate)
			{
				case "ЭкономДоставка": return Math.round((this.sum_wt * this.sum_size) * 134, 2) + " рублей";
				case "МастерДоставка": return Math.round((this.sum_wt * this.sum_size) * 425, 2) + " рублей";
				case "КоролевскаяДоставка": return Math.round((this.sum_wt * this.sum_size) * 1345, 2) + " рублей";			 
			}
		}
	}
});