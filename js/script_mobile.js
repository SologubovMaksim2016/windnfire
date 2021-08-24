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
  $("#downArrow").on("click", function(){
    if($(this).hasClass('active')){
      $(this).removeClass("active");
      $(this).siblings('.content').slideUp(500);
      $("#downArrow2")[0].style.opacity = "0"
      // $(this)[0].srcset="./svg/blog/arrowDown.svg"
      

     
    }else{      
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $('.content').slideUp(200);
      $(this).siblings('.content').slideDown(500);
      $("#downArrow2")[0].style.opacity = "1"
      // $(this)[0].srcset="./svg/blog/arrowDown2.svg"
    }    
  });
  // $("#downArrow").on("click", function(){
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
// function sendMail(){
//   localStorage.setItem("modal","1");
//   window.open("/?modal=1", "_self");
// }  


  function changeBudgetInput(e){ 
     
          let monetCountTmp = $('#budget_input')[0].value.toString().replace('$','').replace(' ','').replace(' ','').replace(' ','')
          let moneyCount = makeMoney( monetCountTmp );
          if(moneyCount.length > 9 ) moneyCount = moneyCount.replace(' ','').substring(0, moneyCount.length - 1 )
          if(moneyCount == 'NaN') moneyCount='';
          
          $('#budget_input')[0].value = '$ '+ moneyCount;
          $('#budget_input')[0].style.textAlign = "right";
          console.log(moneyCount);
          $("#range-time2")[0].value = Math.round( monetCountTmp/1000) * 1000
          console.log($("#range-time2")[0].value);
      
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
  
  $("#budget_input").keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        $("#budget_input")[0].blur()
        return false;
      }    
  })

  $("#range-time2").on('focus',function(event){
    event.preventDefault();
    $("#range-time2")[0].blur()
    return false;
  })
  $("#budget_input").on('focus',function(){
    $("#landscape")[0].style.display = "none"
    $('#budget_input')[0].style.textAlign = "right";
    $("#budget_input")[0].select()
  })
  $("#range-time2").on('click',function(){
    // debugger;
  })
  $("#budget_input").on('blur',function(){
    let money = $("#budget_input")[0].value.toString().replace('$','').replace(' ','').replace(' ','').replace(' ','')
    let roundMoney =  (Math.round(+money/1000) * 1000).toString()
    let make = makeMoney(roundMoney).replace(' ','').replace(' ','')
    $("#budget_input")[0].value = +make >= 1000 ? '$ '+ makeMoney(make) : "$ 1 000" 

    setTimeout(() => {
      $("#landscape")[0].style.display = ""
    }, 200);    
  })
  function makeMoney(n) {
      n = n.replace(' ',''); 
      // if(n < 1000) n = 1000;
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
  
  // $('#prev').on('click', function(e){
  //   $('#prev-target')[0].click();
  // });
  // $('#next').on('click', function(e){
  //   $('#next-target')[0].click();
  // });
  $('#ww-mobile').on('click', function(e){     
    $('#check-ww-mobile')[0].click();
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
  //     e.stopPropagation();
  //     if( $(".lang-item.show").length == 1 )
  //       $.each($(".lang-item"),function(index,value){  
  //         value.classList.toggle("show")
  //       })
  //     else {
  //       $.each($(".lang-item"),function(index,value){
  //         if (value.innerHTML !== e.target.innerHTML )
  //         value.classList.remove("show");
  //       })
  //     }
  //     if( $(".lang-item.show").length == 0 ){
  //       this.classList.add("show");
  //     }
     
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
      let team =  $('#m1_mono');
      team.hover(function()
          {
            if(this.parentElement.children[0].checked==true) {
              return;
            } else{
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
                case 'hover-dark_net':                
                  $('#dark_net-hover')[0].style.opacity == "1"?  $('#dark_net-hover')[0].style.opacity = "0": $('#dark_net-hover')[0].style.opacity = "1" ;                
                  break;
              
                default:
                  break;
              }
            }
       
      
          });  
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
            this.children[0].style.zIndex = "2"
        } else{
          this.children[1].style.marginLeft = "0px" ;
          this.children[0].style.zIndex = "0"
        } 
      });
      $('.check-country-item input').change(function(e)
        {
         
          if(e.target.name == "check-ww" && e.target.checked){       
            let el = $(".country-checkbox-mobile div div input")//div div label span input
            let el2 = $(".country-img img")
            for (let i = 0; i < el.length; i++) {   
             
              $(".country-checkbox-mobile div div input")[i].checked = true                      
              if(i<9) $(".country-img img")[i*2+1].style.opacity = "1";
            }  
          }
          if(e.target.name == "check-ww" && !e.target.checked){       
            for (let i = 0; i < $(".country-checkbox-mobile div div input").length; i++) {          
              $(".country-checkbox-mobile div div input")[i].checked = false             
              if(i<9) $(".country-img img")[i*2+1].style.opacity = "0";
            }
          }     
        });

      $('.check-country-item input').change(function()
      {
        let checkedCountry =  $('.check-country-item input');  
        for (let i = 0; i < checkedCountry.length; i++) {      
          if( checkedCountry[i].checked){  
            switch (checkedCountry[i].name) {
              case 'check_usa':
                $('#usa-check')[0].style.opacity = "1"; 
                $('#check-usa')[0].style.opacity = "1"  
                break;
              case 'check_rus':
                $('#rus-check')[0].style.opacity = "1";
                $('#check-rus')[0].style.opacity = "1"; 
                break;           
              case 'check_can':
                $('#can-check')[0].style.opacity = "1";
                $('#check-can')[0].style.opacity = "1";
                break;
              case 'check_afr':
                $('#afr-check')[0].style.opacity = "1";
                $('#check-afr')[0].style.opacity = "1";               
                break;
              case 'check_asia':
                $('#asia-check')[0].style.opacity = "1";
                $('#check-asia')[0].style.opacity = "1"; 
                break;
              case 'check_aus':
                $('#aus-check')[0].style.opacity = "1";
                $('#check-aus')[0].style.opacity = "1"; 
                break;
              case 'check_eur':
                $('#eur-check')[0].style.opacity = "1";
                $('#check-eur')[0].style.opacity = "1"; 
                break;
              case 'check-lat-am':
                $('#lat-am-check')[0].style.opacity = "1";
                $('#check-lat-am')[0].style.opacity = "1"; 
                break;
              case 'check-dark-net':
                $('#dark-net-check')[0].style.opacity = "1";
                $('#check-dark-net')[0].style.opacity = "1"; 
                break;
              case 'check-ww':
                $('#ww-check')[0].style.opacity = "1";              
                $('#ww-mobile')[0].srcset = "./svg/maps-mobile/ww-check.svg"
                break;           
            
              default:
                break;
            }
          } else{
             
            switch (checkedCountry[i].name) {
              case 'check_usa':
                $('#usa-check')[0].style.opacity = "0"; 
                $('#check-usa')[0].style.opacity = "0"  
                break;
              case 'check_rus':
                $('#rus-check')[0].style.opacity = "0";
                $('#check-rus')[0].style.opacity = "0"; 
                break;           
              case 'check_can':
                $('#can-check')[0].style.opacity = "0";
                $('#check-can')[0].style.opacity = "0";
                break;
              case 'check_afr':
                $('#afr-check')[0].style.opacity = "0";
                $('#check-afr')[0].style.opacity = "0";               
                break;
              case 'check_asia':
                $('#asia-check')[0].style.opacity = "0";
                $('#check-asia')[0].style.opacity = "0"; 
                break;
              case 'check_aus':
                $('#aus-check')[0].style.opacity = "0";
                $('#check-aus')[0].style.opacity = "0"; 
                break;
              case 'check_eur':
                $('#eur-check')[0].style.opacity = "0";
                $('#check-eur')[0].style.opacity = "0"; 
                break;
              case 'check-lat-am':
                $('#lat-am-check')[0].style.opacity = "0";
                $('#check-lat-am')[0].style.opacity = "0"; 
                break;
              case 'check-dark-net':
                $('#dark-net-check')[0].style.opacity = "0";
                $('#check-dark-net')[0].style.opacity = "0"; 
                break;
              case 'check-ww':
                $('#ww-check')[0].style.opacity = "0";              
                $('#ww-mobile')[0].srcset = "./svg/maps-mobile/ww-NON-check.svg"
                break;
             
            
              default:
                break;
            }
          }
        }  
      });
      document.getElementsByTagName("body")[0].style.overflowX = "hidden";      
    });
  
    // window.onscroll = function() {scrollFunction()};
  
    // function scrollFunction() {
    //   debugger;
    //   let el = document.getElementById("upArrow")
    //   if (document.body.scrollTop > 350 ) {
    //     document.getElementById("upArrow").style.opacity = "1";
    //   } else {
    //     document.getElementById("upArrow").style.opacity = "0";
    //   }
    // }
    window.onscroll = function() {scrollFunction()};

  // function scrollFunction() {
  //   let el = document.getElementById("upArrow")    
  //   if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350 ) {
  //     document.getElementById("upArrow").style.bottom = "2vw";
  //   } else {
  //     document.getElementById("upArrow").style.bottom = "-20vh";
  //   }
  // }
 
  function scrollFunction() {
    let el = document.getElementById("upArrow")    
    if (document.body.scrollTop > 1080 || document.documentElement.scrollTop > 1080 ) {
      document.getElementById("upArrow").style.bottom = "-0.3vh";     

    } else {
      document.getElementById("upArrow").style.bottom = "-20vh";     
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
    
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  function contactSubmit(){
    $("#modal")[0].style.display = "block";
    $("#modal")[0].innerHTML = `  
                <div class="modal-container">
                    <div class="modal-form">
                        <div class="modal-logo-container">
                            <img id="modal-logo" alt="logo" srcset="./img/fire2.gif" loading="lazy">
                        </div>
                        <div class="get-in-touch">
                            <div class="cont-modal1">GET IN TOUCH</div> 
                            <div class="cont-modal2">LEAVE YOUR MESSAGE AND WE’LL GET BACK TO YOU SHORTLY.</div>
                            <div class="modal-content">
                                <div class="modal-form-item">
                                    <input type="text" id="label_tel" placeholder="@MYTELEGRAM" name="telegram">
                                </div>
                                <div class="modal-form-item">
                                    <input type="email" id="label_email" placeholder="EMAIL@EXAMPLE.COM" name="email">
                                </div>                               
                                <div class="modal-form-item">
                                    <input type="url" id="label_name" placeholder="Your name" name="name">
                                </div>
                                <div class="modal-form-item last">
                                    <textarea id="label_text_area" placeholder="Tell us about your needs" name="message"></textarea>
                                </div>
                                <img id="hand"  alt="hand" srcset="./svg/hand2.svg" onclick="rockSubmit()" loading="lazy">
                            </div> 
                        </div>
                        <div class="mob_thank">
                            <div class="mob_thank1">THANK YOU</div> 
                            <div class="mob_thank2">WE WILL CONTACT</div>
                            <div class="mob_thank3">YOU SOON</div>
                        </div>
                        <img id="close-modal"  alt="close" onclick="closeModal()" srcset="./svg/close-modal.svg" loading="lazy">   
                    </div>                
                </div>
                <textarea id="formData"  name="formData"></textarea>
    `


  }
  function closeModal(){
    $("#modal")[0].style.display = "none";
    $(".get-in-touch")[0].style.marginLeft = "0"
    $(".mob_thank")[0].style.marginLeft = "-180vw"
  }


  
  
    
  