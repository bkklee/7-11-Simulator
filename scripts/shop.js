setInterval(function() {
	//New customer
	var customers = Math.random();
	if(customers>0.8){
		customersList.push({name: "Customer", buy: ["Drink","Food"]});
		console.log(customersList);
	}

	//UI update?
}, 1000);