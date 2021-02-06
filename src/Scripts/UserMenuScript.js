$(document).ready(function(){
    $("nav a").on("click",function(e){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    })
});