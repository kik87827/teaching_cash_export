if( window.console == undefined ){ console = { log : function(){} }; }
var touchstart = "ontouchstart" in window;
var userAgent=navigator.userAgent.toLowerCase();
var resizePartWidth = 1023;
/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/

$(function(){
	commonInit();
	dimLayerControl();
	formCommon();
});
$(window).on("load",function(){
	commonResize();
});

function commonInit(){
	// touchmode 식별
	if(touchstart){
		$("html").addClass("touchmode");
	}else{
		$("html").removeClass("touchmode");
	}
	
	if(userAgent.indexOf('samsung')>-1){
		$("html").addClass("samsung");
	}
}

/* 공통리사이즈 호출 */
function commonResize(){
	var $window_width = 0;
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
		if($(window).width()<resizePartWidth){
			botlayerCall();
		}
	}).resize();
}


function botlayerCall(){
    var $btn_botpos_wrap = $(".btn_botpos_wrap");
    var $btn_botpos_wrap_height = $btn_botpos_wrap.outerHeight() || 0;
    var $has_botpos = $(".page_wrap.has_botpos");
    $has_botpos.css({"padding-bottom" : "" });
    $has_botpos.css({"padding-bottom" : $btn_botpos_wrap_height});
}


/* layer popup event */
function dimLayerControl(){
	var $modal = $(".dimlayer_z");
	if($modal.length===0){return;}
	
	var readywidth = $(window).width();
	
	var objThis = this;
	$modal.on("click",".btn_layerclose,.closetrigger,.btn_botpos_close,.bg_dim",function(e){
		var $this = $(this),
			$t_p = $this.parents(".dimlayer_z");

		e.preventDefault();
		objThis.dimLayerHide({ 
			target : $t_p
		});
	});
};
/* layer popup show */
function dimLayerShow(option){
	var $modal = null,
		$target = null,
		$page_wrap = null;
	
	$(function(){
		$modal = $(".dimlayer_z");
		$target = $(option.target);
		$page_wrap = $(".page_wrap");
		if($modal.length===0){return;}
		$modal.removeClass("active");
		$target.addClass("active");
		
		$page_wrap.css({"z-index":0});
		$("body").append($target);
		heightcheck();


		if("openCallback" in option){
			option.openCallback();
		}
		function heightcheck(){
			$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()});
			$("html").addClass("touchDis");
		}
	});
};
/* layer popup hide */
function dimLayerHide(option){
	var $modal = null,
		$target = null;
		
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		if($modal.length===0){return;}
		$target.removeClass("active");
		$(".page_wrap").css({"z-index":""});
		$("html,body").removeClass("touchDis touchDis2");
		scrollEnd();
		
		if("closeCallback" in option){
			option.closeCallback();
		}
		
		function scrollEnd(){
			$("body").css({"margin-top":0});
			window.scrollTo(0,Number($("body").data("data-scr")));
		}
	});
}


/* formCommon */
function formCommon(){
	var $btn_select_call = $(".btn_select_call");
	var $form_field = $(".form_field");
	var $form_input = $("input.form_input");
	var $field_multi_d_field = $(".field_multi_fxwrap.d_field");
	var $field_multi_form_input = $field_multi_d_field.children("input.form_input");
	var $field_multi_reset = $field_multi_d_field.children(".btn_fieldreset");
	// $form_input.each(function(){
	// 	var $this = $(this);
	// 	var $t_p = $this.parents(".form_field");
		
	// 	if($this[0].value.length>0){
	// 		$t_p.addClass("active");
	// 	}
	// });



	$form_input.on("focusin keydown keypress",function(){
		var $this = $(this);
		var $t_p = $this.parents(".form_field");
		
		$form_field.removeClass("active");
		if($t_p.length){
			$t_p.addClass("active");
		}
	});
	$form_input.on("focusout",function(){
		var $this = $(this);
		var $t_p = $this.parents(".form_field");
		
		if($t_p.length){
			$t_p.removeClass("active");
		}
	});

	
	$field_multi_d_field.each(function(){
		var $this = $(this),
			$t_input = $this.children(".form_input");
		
		if($t_input[0].value.length>0){
			$this.addClass("has_value");
		}else{
			$this.removeClass("has_value");
		}
	});
	$field_multi_form_input.on("focusin keydown keypress focusout",function(){
		var $this = $(this);
		var $t_p = $this.parents(".d_field");
		
		if($this[0].value.length){
			$t_p.addClass("has_value");
		}else{
			$t_p.removeClass("has_value");
		}
	});
	$field_multi_reset.on("click",function(){
		var $this = $(this);
		var $t_p = $this.parents(".d_field");
		var $t_input = $t_p.children(".form_input")
		
		$t_input.val("");
	});

	$btn_select_call.on("focusout",function(){
		var $this = $(this);
		$this.removeClass("active");
	});
	$btn_select_call.on("click",function(){
		var $this = $(this);
		var $t_t = $this.attr("data-target");
		
		if($t_t.length){
			dimLayerShow({target : $t_t});
		}
	});
	$(document).on("click",".form_option",function(e){
		e.preventDefault();
		var $this = $(this);
		var $this_text = $this.text();
		var $t_p = $this.parents(".dimlayer_z");
		var $btn_target = $($t_p.attr("data-call"));
		$btn_target.children(".btn_select_call_in").text($this_text);
		$btn_target.addClass("active");
		dimLayerHide({target : $t_p});
	})
}