
$('#prev').on('click', function(e){
    $('#prev-target')[0].click();
  });
  $('#next').on('click', function(e){
    $('#next-target')[0].click();
  });
  $('#ww').on('click', function(e){
    $('#check-ww')[0].click();
  });
  
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
    });
  
  
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      let el = document.getElementById("upArrow")
     
      if (window.scrollTop > 350 || document.documentElement.scrollTop > 350 ) {
        document.getElementById("upArrow").style.bottom = "2vw";
      } else {
        document.getElementById("upArrow").style.bottom = "-20vh";
      }
    
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
                                      <input type="text" id="label_tel" placeholder="@MYTELEGRAM *" name="telegram">
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
  
  
  
    
  