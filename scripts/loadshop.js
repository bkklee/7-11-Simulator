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

var goodsList = [{name: "三文治", price: 10.2, number: 2}, {name: "水", price: 5.2, number: 3}, {name: "薯片", price: 6.2, number: 4}];

//UI
var itemList;

$.get("/shopDetails", function(result){
	itemList = result.itemList;

	itemList.forEach(function(item){
		if(item.item == "▤"){
			$shop.find("span").eq(item.pos[0]*shopSize+item.pos[1]).html(item.item).addClass("shelf");
		}else{
			$shop.find("span").eq(item.pos[0]*shopSize+item.pos[1]).html(item.item);
		}
	});

	goodsList.forEach(function(goods){
		var tmp = '<li class="collection-item avatar"><i class="material-icons circle">folder</i>'+
	      		  '<span class="title">'+goods.name+'</span>'+
	      		  '<p>$'+goods.price+'</p>'+
	      		  '<a class="secondary-content red-text">尚餘 <span>'+goods.number+'</span></a></li>';
	    $("#goods").append(tmp);
	});

	$("#myshop").html($shop);
	$("#money").html(money);
	$("#customers").html(customerNum);

	$(".shelf").click(function(){
		$(".modal").modal();
		$("#shelfmodal").modal("open");
	});
});