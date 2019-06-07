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

//Customers
$newUI = $shop.clone();
customersList.forEach(function(customer){
	$newUI.find("span").eq(customer.pos[0]*shopSize+customer.pos[1]).html("◼");
});
$("#myshop").html($newUI);

$(".shelf").click(function(){
	$(".modal").modal();
	$("#shelfmodal").modal("open");
});