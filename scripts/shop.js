//user's shop
var $shop = $('<div><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◻</span><span>◼</span><br>'+
		   '<span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><span>◼</span><br></div>');

var shopSize = 8;

var itemList = [{item: "▤", pos: [1,1]}, {item: "▤", pos: [2,1]}, {item: "▤", pos: [3,1]}];

//UI
itemList.forEach(function(item){
	$shop.find("span").eq(item.pos[0]*shopSize+item.pos[1]).html(item.item).addClass("shelf");
});

$shop.find("span").eq(41).html("▣");
$shop.find("span").eq(42).html("▣");
$shop.find("span").eq(62).html("◪");

$("#myshop").html($shop);

//Shop related js
$(".shelf").click(function(){
	$(".modal").modal();
	$("#shelfmodal").modal("open");
});

var jobsList = [];
var customersList = [];

setInterval(function() {
	//New customer
	var customers = Math.random();
	if(customers>0.8){
		customersList.push({name: "Customer", buy: ["Drink","Food"]});
		console.log(customersList);
	}

	//UI update?
}, 1000);