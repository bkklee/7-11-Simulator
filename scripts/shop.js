$.getScript("/scripts/helper.js");

var jobsList = [];
var customersList = [];

//This two should get from server
var money = 0;
var customerNum = 0;

setInterval(function() {
	//Customer Movement
	for( var i = 0; i < customersList.length; i++){ 
		if(customersList[i].pos[1]==6 && customersList[i].pos[0]!=3){
			customersList[i].pos[0]--;
		}else if(customersList[i].pos[0]==3 && customersList[i].pos[1]!=2){
			customersList[i].pos[1]--;
		}else if(customersList[i].pos[1]==2 && customersList[i].pos[0]!=5){
			customersList[i].pos[0]++;
		}else{
      //Add money
      money += goodsList[customersList[i].buy[0]].price;
      money = Math.round10(money, -1);
      $("#money").html(money);

      //Minus item Number
      goodsList[customersList[i].buy[0]].number--;
      $("#goods").find("li").eq(customersList[i].buy[0]).find("a").find("span").html(goodsList[customersList[i].buy[0]].number);

      //Remove from array
			customersList.splice(i, 1); 
			i--;

      //Add customer number by 1
			customerNum += 1;
			$("#customers").html(customerNum);
		}
	}

	//New customer
	var newCustomer = Math.random();
	if(newCustomer>0.8){
    var customerItem = Math.floor(Math.random()*goodsList.length);
		customersList.push({name: "Customer", buy: [customerItem], pos: [7,6]});
	}

	$newUI = $shop.clone();
	customersList.forEach(function(customer){
		$newUI.find("span").eq(customer.pos[0]*shopSize+customer.pos[1]).html("◼");
	});
	$("#myshop").html($newUI);
	
	$(".shelf").click(function(){
		$(".modal").modal();
		$("#shelfmodal").modal("open");
	});
	
}, 1000);

setInterval(function() {
  $.post("/updateGame", {
    money: money,
    customers: customerNum
  }, function(msg){
    console.log(msg);
  });

}, 60000);