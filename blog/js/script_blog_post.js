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
  $(document).ready(function(){
  
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
      }else{      
        $(".set > a").removeClass("active");
        $(this).addClass("active");
        $('.content').slideUp(200);
        $(this).siblings('.content').slideDown(500);
        $("#downArrow2")[0].style.opacity = "1"
      }    
    });
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
  // function selectClear() {
  //   let country = ["ru","en","cz"] 
  //   for (let c = 0; c < country.length; c++) {
  //     if($(`.c21 .${country[c]}`).length > 0){
  //       let el = $(`.c21 .${country[c]}`)
  //       for (let i = 0; i < el.length; i++) {
  //        el[i].style.display = "none"        
  //       }
  //     }       
  //   }
  // }
  
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
  //    selectClear()
  //     for (let j = 0; j < $(`.c21 .${this.innerText.toLowerCase()}`).length; j++) {
  //        $(`.c21 .${this.innerText.toLowerCase()}`)[j].style.display = "block"
  //     }
  //   if( $(".lang-item.show").length == 0 ){
      
  //     this.classList.add("show");
  //   }
   
  // });
  
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
    });
  $("#close").on("click", function(e) {
      e.stopPropagation();
      $(".menu").toggleClass("open"); 
    });
  
  
  
    
  
  
  
  
  
  
    $(document).ready(function()
    {       
      document.getElementsByTagName("body")[0].style.overflowX = "hidden"; 
      if (document.body.scrollTop || document.documentElement.scrollTop < 50 ) {
        document.getElementById("logo").style.opacity = "1";
      } 
    });
  
  
    // window.onscroll = function() {scrollFunction()};
  
    // function scrollFunction() {
    //   let el = document.getElementById("upArrow")
     
    //   if (document.body.scrollTop || document.documentElement.scrollTop > 350 ) {
    //     document.getElementById("upArrow").style.bottom = "-0.3vh";
    //   } else {
    //     document.getElementById("upArrow").style.bottom = "-10vh";
    //   }
    //   if (document.body.scrollTop || document.documentElement.scrollTop > 50 ) {
        
    //     document.querySelector("#center-logo a").style.pointerEvents = "none"; 
  
    //     // document.getElementById("logo").style.transform = "scale(0)";
  
    //   } else {    
    //     document.querySelector("#center-logo a").style.pointerEvents = "auto";
  
    //     // document.getElementById("logo").style.transform = "scale(1.0)";
    //   }
    // }
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
  }
    function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    $(document).mouseup(function (e) {
      var menu = $("#menu");
      if (  !menu.is(e.target) && menu.has(e.target).length === 0) { 
        $(".menu").removeClass("open"); 
        $("#gamburger").addClass("open"); 
    }})
  