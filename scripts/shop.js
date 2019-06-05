(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

var jobsList = [];
var customersList = [];

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
			customersList.splice(i, 1); 
			i--;

			var money = Number($("#money").html());
			money += 10.2;
			money = Math.round10(money, -1);
			$("#money").html(money);

			var customerNum = Number($("#customers").html());
			customerNum += 1;
			$("#customers").html(customerNum);
		}
	}

	//New customer
	var newCustomer = Math.random();
	if(newCustomer>0.8){
		customersList.push({name: "Customer", buy: ["三文治"], pos: [7,6]});
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

	console.log(customersList);
	
}, 1000);