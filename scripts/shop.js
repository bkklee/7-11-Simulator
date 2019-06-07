//Helper function
$.getScript("/scripts/helper.js");

//One time variable
var customersList = [];

var $shop = $('<div><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><br></div>');

var shopSize = 8;

//Get info from server
var goodsList, money, customerNum;

$.get("/shopDetails", function(result){
	money = result.money;
	customerNum = result.customers;
	goodsList = result.goodsList;

	var itemList = result.itemList;

	itemList.forEach(function(item){
		if(item.item == "▤"){
			$shop.find("span").eq(item.pos[0]*shopSize+item.pos[1]).html(item.item).addClass("shelf");
		}else{
			$shop.find("span").eq(item.pos[0]*shopSize+item.pos[1]).html(item.item);
		}
	});

	//Money and customer number
	$("#money").html(money);
	$("#customers").html(customerNum);

	//Goods
	var tmp = "";
	goodsList.forEach(function(goods){
		tmp += '<li class="collection-item avatar"><i class="material-icons circle">folder</i>'+
	      		  '<span class="title">'+goods.name+'</span>'+
	      		  '<p>$'+goods.price+'</p>'+
	      		  '<a class="secondary-content red-text">尚餘 <span>'+goods.number+'</span></a></li>';
	});
	$("#goods").html(tmp);

	$("#myshop").html($shop);

	$(".shelf").click(function(){
		$(".modal").modal();
		$("#shelfmodal").modal("open");
	});

});

//Running shop
setInterval(function() {
	//Customer Movement
	for( var i = 0; i < customersList.length; i++){ 
		if(customersList[i].pos[1]==6 && customersList[i].pos[0]!=3){
			customersList[i].pos[0]--;
		}else if(customersList[i].pos[0]==3 && customersList[i].pos[1]!=2){
			customersList[i].pos[1]--;
		}else if(customersList[i].pos[1]==2 && customersList[i].pos[0]!=5){
			if(customersList[i].pos[0]==3 && customersList[i].pos[1]==2){
			    //Minus item Number
			    if(goodsList[customersList[i].wantToBuy[0]].number > 0){
			    	goodsList[customersList[i].wantToBuy[0]].number--;
			    	customersList[i].obtained.push(customersList[i].wantToBuy[0]);
			    }
			    $("#goods").find("li").eq(customersList[i].wantToBuy[0]).find("a").find("span").html(goodsList[customersList[i].wantToBuy[0]].number);

			    customersList[i].wantToBuy.splice(0, 1); 
			}
			customersList[i].pos[0]++;
		}else{
			if(customersList[i].obtained.length > 0){
		        //Add money
		        customersList[i].obtained.forEach(function(item){
			        money += goodsList[item].price;
			        money = Math.round10(money, -1);
		        });

		        $("#money").html(money);

		        //Add customer number by 1
				customerNum += 1;
				$("#customers").html(customerNum);
			}

	      	//Remove from array
			customersList.splice(i, 1); 
			i--;
		}
	}

	//New customer
	var newCustomer = Math.random();
	if(newCustomer>0.8){
    	var customerItem = Math.floor(Math.random()*goodsList.length);
		customersList.push({name: "Customer", wantToBuy: [customerItem], pos: [7,6], obtained: []});
	}

	//UI update
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