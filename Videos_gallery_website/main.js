var videocontent=document.querySelector('.videocontent')
function cool(hello){
    go=document.getElementById('hass')
    console.log(go)
    go.style.display='none'
    var res=hello.trim();
    if(res.indexOf('steepp1steepp2steepp3steepp4')>-1 && res.indexOf('steepp5')>-1)
    {
    res=res.replace('steepp1steepp2steepp3steepp4','')
    res=res.replace('steepp5','')
    res.trim()
    res=res.replace(',]',']')
    resobj=JSON.parse(res)
    resobj.sort(function(a, b) {
    if (a.id !== b.id) {
        return a.id - b.id
    }
    if (a.name === b.name) {
      return 0;
    }
    return a.name > b.name ? 1 : -1;
});
    console.log(resobj)
    var output=``
    resobj.forEach((obj,index)=>{
    if(index==0){
    output+=`
    <div class="closer" id="closer1">
            <img src="thumbnails/${obj.thumbnail}" alt="">
            <div class="text">
                <h3>${obj.songname}</h3>
                <p>${obj.description} </p>
                <a href="videos/${obj.videoname}" download>Download</a>
            </div>
        </div>
    `   
    }
    else 
    {
    if(index%2==0)
    {
      output+=`
    <div class="closer" >
            <img src="thumbnails/${obj.thumbnail}" alt="">
            <div class="text">
                <h3>${obj.songname}</h3>
                <p>${obj.description} </p>
                <a href="videos/${obj.videoname}" download>Download</a>
            </div>
        </div>
    `   
        }else{
        output+=`
    <div class="closer closer2">
            <img src="thumbnails/${obj.thumbnail}" alt="">
            <div class="text">
                <h3>${obj.songname}</h3>
                <p>${obj.description} </p>
                <a href="videos/${obj.videoname}" download>Download</a>
            </div>
        </div>
    `   
    }}
    })
    videocontent.innerHTML=output
    }
    else
    {
        console.log('Cannot fetch data from server')
    }

}
tuy='steepp1steepp2steepp3steepp4 [{"id":"1","thumbnail":"first.jpg","videoname":"coolstatus.mp4","songname":"lovely 30 sec song ","description":"this song is heart touching and a lovely song . it gave you a felling of awesomeness . amazing song"},{"id":"2","thumbnail":"cutegirl.jpg","videoname":"cutegirlvid.mp4","songname":"Cute girl song","description":"This song is sung by mr jassi gill . amazing song . sweet song lrysics by deep mann"},{"id":"4","thumbnail":"4.jpg","videoname":"4.mp4","songname":"30 seconf fourth song","description":"this is song that is hit in punjjabi industries hdhfhnfh fhf fhjf hf fhf fhf"},{"id":"3","thumbnail":"3.jpg","videoname":"3.mp4","songname":"30 seconf third song","description":"this is song that is hit in punjjabi industries hdhfhnfh fhf fhjf hf fhf fhf"},] steepp5'
setTimeout(()=>{cool(tuy)},1500)