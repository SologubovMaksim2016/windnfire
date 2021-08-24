// let cursorInterval = setInterval( function(){
//   $('#budget-cursor')[0].style.display = $('#budget-cursor')[0].style.display == ""? 'none': ''
// },450);
$(document).ready(function(){
  $("button").on("click",function(e){
    if(e.target.innerHTML == "MORE"){
      localStorage.setItem("slide_id", +e.target.value);
      window.open("/services?slide_id=1", "_self");
      e.preventDefault();
    }
     
    return
  })


    $(document).mouseup(function (e) {
        var menu = $("#menu");
        if (!menu.is(e.target) 
        && menu.has(e.target).length === 0) { 
          $(".menu").removeClass("open"); 
          $("#gamburger").addClass("open"); 
    }

  });

  $("#sub-menu p").on("click",function(e){
    e.stopPropagation();
    $(".menu").toggleClass("open"); 
    $("#gamburger").toggleClass("open");    
  })

  let touchmoved;
  $('.content p a').on('touchend', function(e){
      if(touchmoved != true){
        setTimeout(() => {
          $("#home").click(); 
        }, 100);
        setTimeout(() => {
          $("#close").click(); 
        }, 850);
      }
  }).on('touchmove', function(e){
      touchmoved = true;
  }).on('touchstart', function(){
      touchmoved = false;
  });  
  
  // $(".set > a").on("click", function(){
  //   if($(this).hasClass('active')){
  //     $(this).removeClass("active");
  //     $(this).siblings('.content').slideUp(500);
     
  //   }else{      
  //     $(".set > a").removeClass("active");
  //     $(this).addClass("active");
  //     $('.content').slideUp(200);
  //     $(this).siblings('.content').slideDown(500);
  //   }    
  // });
  if($(".cont3-5")[0] != undefined)
  $.ajax({
    url: '/data/load',
    method: 'post',
    dataType: 'json',
    success: function(data){
      let el1 = $(".cont3-5")[0];
      el1.innerHTML = el1.innerHTML.substring(0,8) + data.defi;
      let el2 = $(".cont4-4")[0];
      el2.innerHTML = el2.innerHTML.substring(0,8) + data.development;
    }
  });  
  // $.ajax({    
  //   url: '/data/load',
  //   method: 'post',
  //   dataType: 'json',
  //   success: function(data){
  //     debugger;
  //     let el1 = $(".cont3-5")[0];
  //     el1.innerHTML = el1.innerHTML.substring(0,8) + data.defi;
  //     let el2 = $(".cont4-4")[0];
  //     el2.innerHTML = el2.innerHTML.substring(0,8) + data.development;
  //   }
  // });  
  $(":checkbox").change(function()
  {
    if(this.name != 'defi' && this.name != 'development') return
    let el;
    if(this.name == 'defi') el = $(".cont3-5")[0];
    if(this.name == 'development')  el =  $(".cont4-4")[0]; 
    if(this.checked==true){
      let count = +el.innerHTML.substring(8)
      el.innerHTML = el.innerHTML.substring(0,8) + ++count ;
    }  
    if(this.checked==false){
      let count = +el.innerHTML.substring(8)
      el.innerHTML = el.innerHTML.substring(0,8) + --count ;
    }
  });   
});
function changeBudgetInput(e){ 
  let monetCountTmp = $('#budget_input')[0].value.toString().replace('$','').replace(' ','').replace(' ','').replace(' ','')
  let moneyCount = makeMoney( monetCountTmp );
  if(moneyCount.length > 9 ) moneyCount = moneyCount.replace(' ','').substring(0, moneyCount.length - 1 )
  if(moneyCount == 'NaN') moneyCount='';
  $('#budget_input')[0].value = '$ '+ moneyCount;
  $('#budget_input')[0].style.textAlign = "right";
  console.log(moneyCount);
  let el = $("#budget_input")[0].value;
  // debugger;
  $("#range-budget")[0].value = Math.round( monetCountTmp/1000) * 1000
  console.log($("#range-budget")[0].value);

// if($('#budget-cursor')[0].value !== '') {
//     $('#budget-cursor')[0].style.display = "none"                
//     let moneyCount = makeMoney( $('#budget_input')[0].value.toString().replace(' ',''));
//     if(moneyCount.length > 9 ) moneyCount = moneyCount.replace(' ','').substring(0, moneyCount.length - 1 )
//     if(moneyCount == 'NaN') moneyCount='';
//     $('#budget_input')[0].value = moneyCount;
//     $('#budget_input')[0].style.textAlign = "right";
//     clearInterval(cursorInterval)
// } 
// if($('#budget_input')[0].value == ''){
//     cursorInterval = setInterval( () =>  $('#budget-cursor')[0].style.display = $('#budget-cursor')[0].style.display == ""? 'none': '' ,450)
//     $('#budget_input')[0].style.textAlign = '';
// }     
}   

$("#budget_input").on('focus',function(){
    $("#budget_input")[0].select()
})
$("#budget_input").on('blur',function(){
    let money = $("#budget_input")[0].value.toString().replace('$','').replace(' ','').replace(' ','').replace(' ','')
    let roundMoney =  (Math.round(+money/1000) * 1000).toString()
    let make = makeMoney(roundMoney).replace(' ','').replace(' ','')
    $("#budget_input")[0].value = +make >= 1000 ? '$ '+ makeMoney(make) : "$ 1 000" 
})
$("#budget_input").keydown(function(event){
    if(event.keyCode == 13) {
        event.preventDefault();   
        let k = $("#budget_input")[0].value.replace('$','').replace(' ','').replace(' ','');
        if(k < 1000 ) $("#budget_input")[0].value = "$ 1 000"
        $("#budget_input")[0].blur()
        return false;
    }    
})



function makeMoney(n) {
n = n.replace(' ','').replace(' ',''); 
// if(n == 0) n = 1000;
if(n > 400000) n = 400000;
return parseFloat(n).toFixed(0).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,'$1 ');
}
// function makeMoney(n) {
//   // format number 1000000 to 1 234 567
//     if(n < 1000) n = 1000;
//     if(n > 1000000) n = 1000000;
//     debugger;
//   return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
// }


function changeBudgetRange(val){
  let moneyCount = makeMoney(val.toString().replace('$','').replace(' ','').replace(' ','').replace(' ','')); 

  $('#budget_input')[0].value = '$ ' + moneyCount;

  if($('#budget_input')[0].value != '') {

  $('#budget_input')[0].style.textAlign = "right";
  // $('#budget-cursor')[0].style.opacity = "0";
  }
    
  else{    
  $('#budget_input')[0].style.textAlign = "";
  // $('#budget-cursor')[0].style.opacity = "1";
  }
} 
// function changeBudgetInput(){ 
//   return
//     if($('#budget-cursor')[0].value !== '') {
//         $('#budget-cursor')[0].style.display = "none"                
//         let moneyCount = makeMoney($('#budget_input')[0].value.toString().replace(' ',''));
//         if(moneyCount.length > 9 ) moneyCount = moneyCount.replace(' ','').substring(0, moneyCount.length - 1 )
//         if(moneyCount == 'NaN') moneyCount='';
//         $('#budget_input')[0].value = moneyCount;
//         $('#budget_input')[0].style.textAlign = "right";
//         clearInterval(cursorInterval)
//     } 
//     if($('#budget_input')[0].value == ''){
//         cursorInterval = setInterval( () =>  $('#budget-cursor')[0].style.display = $('#budget-cursor')[0].style.display == ""? 'none': '' ,450)
//         $('#budget_input')[0].style.textAlign = '';
//     }     
// }   
// function makeMoney(n) {
//     n = n.replace(' ',''); 
//     if(n < 1000) n = 1000;
//     if(n > 1000000) n = 1000000;
// return parseFloat(n).toFixed(0).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,'$1 ');
// }
// function changeBudgetRange(val){
  
//   let moneyCount = makeMoney(val.toString().replace(' ',''));  
  
//   $('#budget_input')[0].value = moneyCount;

//     if($('#budget_input')[0].value != '') {
      
//       $('#budget_input')[0].style.textAlign = "right";
//       $('#budget-cursor')[0].style.opacity = "0";
//     }
        
//     else{    
//       $('#budget_input')[0].style.textAlign = "";
//       $('#budget-cursor')[0].style.opacity = "1";
//     }
// } 

$('#arrow_prev').on('click', function(e){
  $('#prev-target')[0].click();
});
$('#arrow_next').on('click', function(e){
  $('#next-target')[0].click();
});
$('#ww').on('click', function(e){
  $('#check-ww')[0].click();
});
////////////////////////////////////////// управление  переключением языков  ///////////////////////////////////
$(document).ready(function(){
  try {
     if( localStorage.getItem("lang") ) {
      let lan = localStorage.getItem("lang")
      $.each($(".lang-item"),function(index,value){     
        value.classList.remove("show");
      })
      $(`#${lan}`).addClass("show");
      selectClear()    
      $(`.c21 .${lan}`)[0].style.display = "block"  
      localStorage.setItem("lang", lan);
     
      for (let j = 0; j < $(`.c21 .${lan}`).length; j++) {
        $(`.c21 .${lan}`)[j].style.display = "block"
      }
    }
    else{
      localStorage.setItem("lang", "en");
    }
  } catch (error) {
    
  }
   

});
function selectClear() {
  let country = ["ru","en","cz"] 
  for (let c = 0; c < country.length; c++) {
    let el = $(`.c21 .${country[c]}`)
    if($(`.c21 .${country[c]}`).length > 0){        
      for (let i = 0; i < el.length; i++) {
       el[i].style.display = "none"        
      }
    }       
  }
}

$(".lang-item").on("click", function(e) {
  e.stopPropagation();
  if( $(".lang-item.show").length == 1 )
    $.each($(".lang-item"),function(index,value){   
      value.classList.toggle("show")
    })
  else {
    $.each($(".lang-item"),function(index,value){
      if (value.innerHTML !== e.target.innerHTML )
      value.classList.remove("show");
    })
  }
   selectClear()
  for (let j = 0; j < $(`.c21 .${this.innerText.toLowerCase()}`).length; j++) {
      $(`.c21 .${this.innerText.toLowerCase()}`)[j].style.display = "block"
  }
  if( $(".lang-item.show").length == 0 ){    
    this.classList.add("show");   
  }  
  localStorage.setItem("lang", `${this.innerText.toLowerCase()}`);
});
// $(".lang-item").on("click", function(e) {
//   e.stopPropagation();
//   if( $(".lang-item.show").length == 1 )
//     $.each($(".lang-item"),function(index,value){   
//       value.classList.toggle("show")
//     })
//   else {
//     $.each($(".lang-item"),function(index,value){
//       if (value.innerHTML !== e.target.innerHTML )
//       value.classList.remove("show");
//     })
//   }
//   if( $(".lang-item.show").length == 0 ){
//     this.classList.add("show");
//   }
 
// });

$("#gamburger").on("click", function(e) {
    e.stopPropagation();
    $(".menu").toggleClass("open");
    $("#gamburger").toggleClass("open");  
  });
$("#close").on("click", function(e) {
    e.stopPropagation();
    $(".menu").toggleClass("open"); 
    $("#gamburger").toggleClass("open"); 
  });



  $('.checkbox__control3').mouseover(function() {
    document.getElementById("svg3").style.display = "block";
  })
  $('.checkbox__control3').mouseout(function() {
    document.getElementById("svg3").style.display = "none";
  })
  $('.checkbox__control4').mouseover(function() {
    document.getElementById("svg4").style.display = "block";
  })
  $('.checkbox__control4').mouseout(function() {
    document.getElementById("svg4").style.display = "none";
  })
  $('.checkbox__control8_1').mouseover(function() {
    document.getElementById("svg8_1").style.display = "block";
  })
  $('.checkbox__control8_1').mouseout(function() {
    document.getElementById("svg8_1").style.display = "none";
  })
  $('.checkbox__control8_2').mouseover(function() {
    document.getElementById("svg8_2").style.display = "block";
  })
  $('.checkbox__control8_2').mouseout(function() {
    document.getElementById("svg8_2").style.display = "none";
  })
  $('.checkbox__control10').mouseover(function() {
    document.getElementById("svg10").style.display = "block";
    $('.cont10').addClass("checked") 
  })
  $('.checkbox__control10').mouseout(function() {
    document.getElementById("svg10").style.display = "none";    
    if($('#check10')[0].checked == false) $('.cont10').removeClass("checked")     
  })
  $('.checkbox__control10-1').mouseover(function() {
    document.getElementById("svg10-1").style.display = "block";
    $('.cont10-1').addClass("checked") 
  })
  $('.checkbox__control10-1').mouseout(function() {
    document.getElementById("svg10-1").style.display = "none";    
    if($('#check10-1')[0].checked == false) $('.cont10-1').removeClass("checked")     
  })
  $('.checkbox__control10-2').mouseover(function() {
    document.getElementById("svg10-2").style.display = "block";
    $('.cont10-2').addClass("checked") 
  })
  $('.checkbox__control10-2').mouseout(function() {
    document.getElementById("svg10-2").style.display = "none";    
    if($('#check10-2')[0].checked == false) $('.cont10-2').removeClass("checked")     
  })
  $('.checkbox__control10-3').mouseover(function() {
    document.getElementById("svg10-3").style.display = "block";
    $('.cont10-3').addClass("checked") 
  })
  $('.checkbox__control10-3').mouseout(function() {
    document.getElementById("svg10-3").style.display = "none";    
    if($('#check10-3')[0].checked == false) $('.cont10-3').removeClass("checked")     
  })

  
  $('.checkbox__control12').mouseover(function() {
    document.getElementById("svg12").style.display = "block";
    $('.cont12').addClass("checked") 
  })
  $('.checkbox__control12').mouseout(function() {
    document.getElementById("svg12").style.display = "none";    
    if($('#check12')[0].checked == false) $('.cont12').removeClass("checked")     
  })
  $('.checkbox__control12-1').mouseover(function() {
    document.getElementById("svg12-1").style.display = "block";
    $('.cont12-1').addClass("checked") 
  })
  $('.checkbox__control12-1').mouseout(function() {
    document.getElementById("svg12-1").style.display = "none";    
    if($('#check12-1')[0].checked == false) $('.cont12-1').removeClass("checked")     
  })
  $('.checkbox__control12-2').mouseover(function() {
    document.getElementById("svg12-2").style.display = "block";
    $('.cont12-2').addClass("checked") 
  })
  $('.checkbox__control12-2').mouseout(function() {
    document.getElementById("svg12-2").style.display = "none";    
    if($('#check12-2')[0].checked == false) $('.cont12-2').removeClass("checked")     
  })
  $('.checkbox__control12-3').mouseover(function() {
    document.getElementById("svg12-3").style.display = "block";
    $('.cont12-3').addClass("checked") 
  })
  $('.checkbox__control12-3').mouseout(function() {
    document.getElementById("svg12-3").style.display = "none";    
    if($('#check12-3')[0].checked == false) $('.cont12-3').removeClass("checked")     
  })

  






  $(document).ready(function()
  {  
    
    $(".black.posting div:not(.cont12-4)").click(function()
      {       
        switch (this.innerHTML) {
          case 'POSTING':                
            $('#check12').click() ;                
            break;
          case 'PR':                
            $('#check12-1').click() ;                
            break;
          case 'CONSULTING':      
            $('#check12-2').click() ;
            break;
          case 'DEVELOPMENT':                
            $('#check12-3').click() ;               
            break;

          default:
            break;
        }
      });   
      $(".white.traffic div:not(.cont10-4)").click(function()
      {
        switch (this.innerHTML) {
          case 'TRAFFIC':                
            $('#check10').click() ;                
            break;
          case 'COMMUNITY':                
            $('#check10-1').click() ;                
            break;
          case 'SHILLING':                
            $('#check10-2').click() ;
            break;
          case 'INFLUENCERS':                
            $('#check10-3').click() ;               
            break;

          default:
            break;
        }
      });   
      $(".white.traffic div:not(.cont10-4)").hover(function()
      {
        
        if(this.checked) return
        switch (this.innerHTML) {
          case 'TRAFFIC':                
            $("#svg10")[0].style.display = "block" ;
            $('.cont10').addClass("hover")                     
            break;
          case 'COMMUNITY':        
            $("#svg10-1")[0].style.display = "block" ;
            $('.cont10-1').addClass("hover")                 
            break;
          case 'SHILLING':                
            $("#svg10-2")[0].style.display = "block" ;
            $('.cont10-2').addClass("hover")     
            break;
          case 'INFLUENCERS':                
            $("#svg10-3")[0].style.display = "block" ;
            $('.cont10-3').addClass("hover")                   
            break;
          default:
            break;
        }
      }, function(){
        if(this.checked) return        
        switch (this.innerHTML) {
          case 'TRAFFIC':                
            $("#svg10")[0].style.display = "none" ;
            $('.cont10').removeClass("hover")                
            break;
          case 'COMMUNITY': 
            $("#svg10-1")[0].style.display = "none" ;
            $('.cont10-1').removeClass("hover")                 
            break;
          case 'SHILLING':                
            $("#svg10-2")[0].style.display = "none" ;
            $('.cont10-2').removeClass("hover") 
            break;
          case 'INFLUENCERS':                
            $("#svg10-3")[0].style.display = "none" ;
            $('.cont10-3').removeClass("hover")               
            break;
          default:
            break;
        }
      });   
      $(".black.posting div:not(.cont12-4)").hover(function()
      {
        if(this.checked) return
        switch (this.innerHTML) {
          case 'POSTING':                
            $("#svg12")[0].style.display = "block" ;
            $('.cont12').addClass("hover")                     
            break;
          case 'PR':        
            $("#svg12-1")[0].style.display = "block" ;
            $('.cont12-1').addClass("hover")                 
            break;
          case 'CONSULTING':                
            $("#svg12-2")[0].style.display = "block" ;
            $('.cont12-2').addClass("hover")     
            break;
          case 'DEVELOPMENT':                
            $("#svg12-3")[0].style.display = "block" ;
            $('.cont12-3').addClass("hover")                   
            break;
          default:
            break;
        }
      }, function(){
        if(this.checked) return        
        switch (this.innerHTML) {
          case 'POSTING':                
            $("#svg12")[0].style.display = "none" ;
            $('.cont12').removeClass("hover")                
            break;
          case 'PR': 
            $("#svg12-1")[0].style.display = "none" ;
            $('.cont12-1').removeClass("hover")                 
            break;
          case 'CONSULTING':                
            $("#svg12-2")[0].style.display = "none" ;
            $('.cont12-2').removeClass("hover") 
            break;
          case 'DEVELOPMENT':                
            $("#svg12-3")[0].style.display = "none" ;
            $('.cont12-3').removeClass("hover")               
            break;
          default:
            break;
        }
      });   

    $('#check8_1').change(function()
    {
      if(this.checked==true) $('#check8_2')[0].checked = false;     
    });   
    $('#check8_2').change(function()
    {
      if(this.checked==true) $('#check8_1')[0].checked = false;     
    });   

    $('#check10').change(function()
    {     
      if(this.checked==true) $('.cont10').addClass("checked")     
    });   
    $('#check10').change(function()
    {
      if(this.checked==false) $('.cont10').removeClass("checked") 
    });   
    $('#check10-1').change(function()
    {     
      if(this.checked==true) $('.cont10-1').addClass("checked")     
    });   
    $('#check10-1').change(function()
    {
      if(this.checked==false) $('.cont10-1').removeClass("checked") 
    });   
    $('#check10-2').change(function()
    {     
      if(this.checked==true) $('.cont10-2').addClass("checked")     
    });   
    $('#check10-2').change(function()
    {
      if(this.checked==false) $('.cont10-2').removeClass("checked") 
    });   
    $('#check10-3').change(function()
    {     
      if(this.checked==true) $('.cont10-3').addClass("checked")     
    });   
    $('#check10-3').change(function()
    {
      if(this.checked==false) $('.cont10-3').removeClass("checked") 
    });   

    $('#check12').change(function()
    {     
      if(this.checked==true) $('.cont12').addClass("checked")     
    });   
    $('#check12').change(function()
    {
      if(this.checked==false) $('.cont12').removeClass("checked") 
    });   
    $('#check12-1').change(function()
    {     
      if(this.checked==true) $('.cont12-1').addClass("checked")     
    });   
    $('#check12-1').change(function()
    {
      if(this.checked==false) $('.cont12-1').removeClass("checked") 
    });   
    $('#check12-2').change(function()
    {     
      if(this.checked==true) $('.cont12-2').addClass("checked")     
    });   
    $('#check12-2').change(function()
    {
      if(this.checked==false) $('.cont12-2').removeClass("checked") 
    });   
    $('#check12-3').change(function()
    {     
      if(this.checked==true) $('.cont12-3').addClass("checked")     
    });   
    $('#check12-3').change(function()
    {
      if(this.checked==false) $('.cont12-3').removeClass("checked") 
    });   
    $('#range-time').on( "input",function()
    {
      let text1 = $('.cont5-5')[0]
      let text2 = $('.cont5-6')[0]
      if (+this.value <250){
          text1.innerHTML = "A WEEK"
          text2.innerHTML = "SRSLY?"
      }
      if ( +this.value >= 250 && +this.value <= 750 ){
          text1.innerHTML = "MONTH"
          text2.innerHTML = "NICE!!!"
      }
      if (+this.value >750){
          text1.innerHTML = "&#8194;YEAR"
          text2.innerHTML = "GOOD!!!"
      }
    }); 
  });

  $(document).ready(function()
  {   
    $(".slider_selection_item").click(function(e){      
      let el = $(".slider_selection_item .checkbox__control")
      for (let i = 0; i < el.length; i++) {
        el[i].classList.remove("active");        
      } 
      this.children[0].classList.add("active");      
    })   
    // $(".slider_selection_item .checkbox__control").click(function(e){ 
    //   let el = $(".slider_selection_item .checkbox__control")
    //   for (let i = 0; i < el.length; i++) {
    //     el[i].classList.remove("active");        
    //   } 
    //   this.classList.add("active");
    // })   

    // $(".slider_selection_item .checkbox__control + div").click(function(e){        
    //   let el = $(".slider_selection_item .checkbox__control")
    //   for (let i = 0; i < el.length; i++) {
    //     el[i].classList.remove("active");        
    //   } 
    //   this.previousElementSibling.classList.add("active");
    // })    
    


    $('.card').hover(function(){ 
      if(this.children[1].style.marginLeft == "0px"){
          this.children[1].style.marginLeft = "100%"
          // this.children[0].style.zIndex = "2"
      } 
      else{
        this.children[1].style.marginLeft = "0px" ;
        // this.children[0].style.zIndex = "0"
      }
     
          
    });

    $('#ww').hover(function()
    {                      
      $('#ww-hover')[0].style.opacity == "1"?  $('#ww-hover')[0].style.opacity = "0": $('#ww-hover')[0].style.opacity = "1" ;
    });

    $('.check-country-item label').hover(function()
    {
      if(this.children[0].children[0].checked==false) {       
        switch (this.classList[1]) {
          case 'hover-rus':                
            $('#rus-hover')[0].style.opacity == "1"?  $('#rus-hover')[0].style.opacity = "0": $('#rus-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-usa':                
            $('#usa-hover')[0].style.opacity == "1"?  $('#usa-hover')[0].style.opacity = "0": $('#usa-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-lat-am':                
            $('#lat-am-hover')[0].style.opacity == "1"?  $('#lat-am-hover')[0].style.opacity = "0": $('#lat-am-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-eur':                
            $('#eur-hover')[0].style.opacity == "1"?  $('#eur-hover')[0].style.opacity = "0": $('#eur-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-afr':                
            $('#afr-hover')[0].style.opacity == "1"?  $('#afr-hover')[0].style.opacity = "0": $('#afr-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-asia':                
            $('#asia-hover')[0].style.opacity == "1"?  $('#asia-hover')[0].style.opacity = "0": $('#asia-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-can':                
            $('#can-hover')[0].style.opacity == "1"?  $('#can-hover')[0].style.opacity = "0": $('#can-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-aus':                
            $('#aus-hover')[0].style.opacity == "1"?  $('#aus-hover')[0].style.opacity = "0": $('#aus-hover')[0].style.opacity = "1" ;                
            break;
          case 'hover-dark-net':                
            $('#dark-net-hover')[0].style.opacity == "1"?  $('#dark-net-hover')[0].style.opacity = "0": $('#dark-net-hover')[0].style.opacity = "1" ;                
            break;            
          // case 'hover-dark-net':                
          //   $('#ww-hover')[0].style.opacity == "1"?  $('#dark-net-hover')[0].style.opacity = "0": $('#dark-net-hover')[0].style.opacity = "1" ;                
            break;            
          default:
            break;
        }
      }  
    });
    $('.check-country-item input').change(function(e)
    {
      if(e.target.name == "check-ww" && e.target.checked){   
        let el = $(".country-checkbox div div label span input")   ;
        for (let i = 0; i < $(".country-checkbox div div label span input").length; i++) {          
          $(".country-checkbox div div label span input")[i].checked = true 
          if(i<9) $(".country-img img")[i*2+1].style.opacity = "1";
        }  
      }
      if(e.target.name == "check-ww" && !e.target.checked){       
        for (let i = 0; i < $(".country-checkbox div div label span input").length; i++) {          
          $(".country-checkbox div div label span input")[i].checked = false
          if(i<9) $(".country-img img")[i*2+1].style.opacity = "0";
        }
      }

      if( e.target.checked){   
        $(`#${e.target.name.substring(6,e.target.name.length)}-hover`)[0].style.opacity = "0" 
        $(`#${e.target.name.substring(6,e.target.name.length)}-check`)[0].style.opacity = "1";
      } else{
        $(`#${e.target.name.substring(6,e.target.name.length)}-hover`)[0].style.opacity = "1" 
        $(`#${e.target.name.substring(6,e.target.name.length)}-check`)[0].style.opacity = "0";
      }

    });
    document.getElementsByTagName("body")[0].style.overflowX = "hidden";      
  });
  function sendMail(){
    contactSubmit()
    // localStorage.setItem("modal","1");
    // window.open("/?modal=1", "_self");
  }  


  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    let el = document.getElementById("upArrow")    
    if (document.body.scrollTop > 1080 || document.documentElement.scrollTop > 1080 ) {
      document.getElementById("upArrow").style.bottom = "-0.3vh";
      document.getElementById("mail").style.opacity = "0.2";
      document.getElementById("gamburger").style.opacity = "0.2";
      document.getElementById("lang").style.opacity = "0.2";

    } else {
      document.getElementById("upArrow").style.bottom = "-20vh";
      document.getElementById("mail").style.opacity = "1";
      document.getElementById("gamburger").style.opacity = "1";
      document.getElementById("lang").style.opacity = "1";
    }  
    var offset = $(window).scrollTop() + $(window).height(),
                $animatables = $('.animatable');
               
                $animatables.each(function(i) {
                    var $animatable = $(this);
                    if (($animatable.offset().top + $animatable.height() - 20) < offset) {
                        $animatable.removeClass('animatable').addClass('animated');
                    }
                });
                $animatables2 = $('.animatable2');
                
                $animatables2.each(function(i) {
                    var $animatable2 = $(this);
                    if (($animatable2.offset().top + $animatable2.height() - 350) < offset) {
                        $animatable2.removeClass('animatable').addClass('animated');
                    }
                });
  }
  $("#mail").hover(
    function(){ document.getElementById("mail").style.opacity = "1"; },
    function(){
        if (document.body.scrollTop > 1080 || document.documentElement.scrollTop > 1080 )
        document.getElementById("mail").style.opacity = "0.2"; 
    }
  )
  $("#gamburger").hover(
    function(){ document.getElementById("gamburger").style.opacity = "1"; },
    function(){ 
      if (document.body.scrollTop > 1080 || document.documentElement.scrollTop > 1080 )
        document.getElementById("gamburger").style.opacity = "0.2"; 
      }
  )
  $("#lang").hover(
    function(){ document.getElementById("lang").style.opacity = "1"; },
    function(){ 
      if (document.body.scrollTop > 1080 || document.documentElement.scrollTop > 1080 )
        document.getElementById("lang").style.opacity = "0.2"; 
      }
  )
  
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  function contactSubmit(){
    $("#modal")[0].style.display = "flex";
    $("#modal")[0].innerHTML = `  
    <div class="modal-form">
                                    <img id="close-modal"  alt="close" onclick="closeModal()" srcset="./svg/close-modal.svg" loading="lazy">
                                    <div class="modal-logo-container">                                       
                                        <a href="/">
                                            <img id="modal-logo"  alt="fire" src="./img/fire.gif" loading="lazy">
                                        </a>
                                    </div>
                                    <div class="touch-container">
                                        <div class="get-container">
                                            <div class="get-text">
                                                <div class="cont-modal1">GET IN TOUCH</div> 
                                                <div class="cont-modal2">LEAVE YOUR MESSAGE AND WE’LL GET BACK TO YOU SHORTLY.</div> 
                                            </div>
                                            <div class="modal-content">
                                                <div class="modal-form-item-container">
                                                     <div class="modal-form-item">                                                
                                                        <input type="text" id="label_tel" placeholder="@MYTELEGRAM" name="telegram">
                                                    </div>
                                                    <div class="modal-form-item">                                                
                                                        <input type="email" id="label_email" placeholder="EMAIL@EXAMPLE.COM" name="email">
                                                    </div>
                                                </div>                                               
                                                <div class="modal-form-item name">                                                
                                                    <input type="url" id="label_name" placeholder="Your name" name="name">
                                                </div>
                                                <div class="modal-form-item last">                                                
                                                    <textarea id="label_text_area" placeholder="Tell us about your needs" name="message"></textarea>
                                                </div>                                                                                                
                                            </div> 
                                        </div>
                                        <div class="thank-container">
                                            <div class="thank">
                                                <div class="thank1">THANK YOU</div> 
                                                <div class="thank2">WE WILL CONTACT</div>
                                                <div class="thank3">YOU SOON</div>
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="lets-rock-container">     
                                        <div class="but-container">
                                            <button id="submit-modal" class="but-modal" type="button" onclick="rockSubmit(this)">LETS ROCK&#8195;</button>
                                            <img id="hand"  alt="hand" srcset="./svg/hand.svg">   
                                        </div>                                  
                                    </div> 
                                </div> 
    `


  }
  function closeModal(){
      $("#modal")[0].style.display = "none";  
      $("#modal")[0].innerHTML = ""
      $(".get-container")[0].style.marginLeft = "0"
      $(".but-container")[0].style.marginLeft = "0"
      $(".thank")[0].style.opacity = "0" 
      $(".thank")[0].style.zIndex = "30" 
      $(".thank-container")[0].style.marginLeft = "200vw" 
      $("#modal-logo")[0].style.marginTop = "0" 
  }


  


  

