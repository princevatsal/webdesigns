if(localStorage.getItem('admin'))
  {
    window.location.assign("../admin")
  }
var loginbtn=document.querySelector('#login')
var video=document.querySelector('#video')
var capturebtn=document.querySelector('.capture')
var befdiv=document.querySelector('.text')
var animation=document.querySelector('.animation')
var retaketext=document.querySelector('.pleaseretake')
// var canvas=document.querySelector('canvas')
var globallstreamvariable
// function to open camera stream
function opencamerastream()
{
  befdiv.style.display='none'
  animation.style.display='none'
  retaketext.style.display='none'
    var w=750
    var h=500
  if (navigator.getUserMedia) {
     navigator.getUserMedia({ audio: false, video: { width:w, height: h } },
      function(stream) {
         var video = document.querySelector('video')
         video.srcObject = stream;
         video.onloadedmetadata = function(e) {
           video.play();
           globallstreamvariable=stream;
           video.style.display='block'
           capturebtn.style.display='inline-block'
         };
      },
      function(err) {
         console.log("The following error occurred: " + err.name)
      }
   );
  } else {
   console.log("getUserMedia not supported")
  }
  //adding event to caoture button 
  capturebtn.addEventListener('click',verify)
}
//function to close camera stream
function closecamerastream(){
 var track = globallstreamvariable.getTracks()[0]  // if only one media track
 track.stop()
 globallstreamvariable=null
 video.style.display='none'
 capturebtn.style.display='none'

}
//function to send img to server and verify it
function verify(){
  var canvas=document.createElement('canvas')
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, 220, 150);
  closecamerastream()
  animation_start()
  var dataURL = canvas.toDataURL();
  var img = document.createElement('img');
  img.setAttribute('src', dataURL);
  //enclose captured image into formdata
  var myformforsending=document.createElement('form')
  var formdata=new FormData()
  fetch(img.src)
  .then(res => res.blob())
  .then(blob => {
    const fileobjectcreated = new File([blob], 'notrealname.jpg', blob)
   formdata.append('imgg',fileobjectcreated)
   var xhr=new XMLHttpRequest()
   xhr.open('POST','main.py',true)
    xhr.onload=function(){
      if(this.status==200)
      {
        var res=this.responseText
        console.log(res)
        if(res.indexOf('photo_matched_as')>-1){
         var cuttedstr=res.slice(res.indexOf('step1step2step3')+31)
         cuttedstr=cuttedstr.slice(0,cuttedstr.indexOf('_finalstep'))
         console.log('adminshab:- '+cuttedstr)
         store(cuttedstr)
         window.location.assign("../admin")
        }
        else{
          animation_end()
          opencamerastream()
          retaketext.style.display='block'
          console.log('please retake photo due to no  face found in pic')
        }
      }
      else{
        animation_end()
        opencamerastream()
        retaketext.style.display='block'
        console.log('please retake pic due to connection error')
      }
    }
    xhr.send(formdata)  
  })
}
//function to start a animation
function animation_start(){
animation.style.display='block'
retaketext.style.display='none'
}
//function to end a animation
function animation_end(){
animation.style.display='none'
console.log('animation ends')
}
//function to close a animation
//adding event on login button to open camera
loginbtn.addEventListener('click',opencamerastream)
//store name in local storage
function store(name){
  if(!localStorage.getItem('admin'))
  {
    localStorage.setItem('admin',name)
    console.log('saved in storage')
  }
  else{
    console.log('already saved')
  }
}