const burg = document.querySelector('#humb-un');
const menu = document.querySelector('#aside');
const nav = document.querySelectorAll('#link');
const ru = document.querySelector('.ru_lang');
const en = document.querySelector('.en_lang');
const arrData = document.querySelectorAll('[data-i18]');
const btnPortfolio = document.querySelector('.button-wrapper');
const photo = document.querySelectorAll('.portfolio-img');
const themeLight= document.querySelector('.theme-light');
const themeDark= document.querySelector('.theme-dark');
const themes = document.querySelectorAll('#theme')
const skills = document.querySelectorAll('.skills');
const portfolio = document.querySelectorAll('.theme');
const video = document.querySelectorAll('.video');
const title = document.querySelectorAll('.section-title')
const aside = document.querySelectorAll('#aside');
const videoPlayer = document.querySelector('.video-player');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const stop = document.querySelector('.stop');
const videoLogo = document.querySelector('.player-logo');
const videoProgr = document.querySelector('.video-progr');
const time = document.querySelector('.controls-time');
const volumeProgr = document.querySelector('#volume');
const volumeOff = document.querySelector('.no-volume');
const volume = document.querySelector('.volume');





if(localStorage.getItem('lang')){
    const event = new Event("click");
    if(localStorage.getItem('lang') == 'ru'){        
        ru.dispatchEvent(event)
    }
    else{        
        en.dispatchEvent(event)
    }
    
}

if(localStorage.getItem('theme')) {
    const event = new Event("click");
    if(localStorage.getItem('theme') == 'theme-dark'){        
        themeDark.dispatchEvent(event)
    }
    else{        
        themeLight.dispatchEvent(event)
    }
    
}



function activeCl(e){
    burg.classList.toggle("active");
    menu.classList.toggle("visible");
    menu.classList.toggle("unvisible");
}

for(let j of nav){
    j.addEventListener("click", activeCl);
}

function getTranslate(e){
    if(this == ru){
        en.style.color = "#FFFFFF";
    }
    else{
        ru.style.color = "#FFFFFF"
    }
    this.style.color = "#BDAE82";
    
    for (let i in i18Obj){
        if (this.textContent == i){
            arrData.forEach(a => {
                let n = a.getAttribute('data-i18');
                for (let key in i18Obj[i]){
                    if (n.toLowerCase() == key){
                        a.textContent = i18Obj[i][key];            
                    }      
                    
                }
                
            })
            localStorage.setItem('lang', this.textContent);
        }
    }
    
    
}

let winter = ['winter1.jpg','winter2.jpg','winter3.jpg','winter4.jpg','winter5.jpg','winter6.jpg'];
let spring = ['spring1.jpg','spring2.jpg','spring3.jpg','spring4.jpg','spring5.jpg','spring6.jpg'];
let summer = ['summer1.jpg','summer2.jpg','summer3.jpg','summer4.jpg','summer5.jpg','summer6.jpg'];
let autumn = ['portfolio-img.jpg','portfolio-img-1.jpg','portfolio-img-2.jpg','portfolio-img-3.jpg','portfolio-img-4.jpg','portfolio-img-5.jpg']

function changeImg(e){
    let season = e.target.dataset.i18.toLowerCase();
    for(let child = 0;child < btnPortfolio.children.length;child++){
        btnPortfolio.children[child].classList.remove('btn-active');
    }
    e.target.classList.add('btn-active');
    for (let i = 0; i < photo.length; i++){
        photo[i].src = `./assets/img/${eval(season)[i]}`;        
    }
}
function changeTheme(e){
    let arrTheme = [skills, portfolio, video, title, aside];
    let theme;
    if(this.classList.value == "theme-dark"){
        theme = 'theme-dark';
    }
    else{
        theme = 'theme-light';
    }
    localStorage.setItem('theme', theme);
    
    themes.forEach(th =>{
        if(th.classList.value.includes(theme)) {
            this.classList.add("hidden");
            for(let i = 0; i < arrTheme.length; i++){
                for(let j = 0; j < arrTheme[i].length; j++){      
                    arrTheme[i][j].classList.add(`${theme}n`);                                    
                }
            }
                
        }
        else if(th.classList.value != theme){ 
            th.classList.remove("hidden");       
            for(let i = 0; i < arrTheme.length; i++){
                for(let j = 0; j < arrTheme[i].length; j++){      
                    arrTheme[i][j].classList.remove(`${th.classList.value}n`);                                      
                }
            }
        }
    })
        
    
}


function playPause(e){
    play.classList.toggle("hidden");
    pause.classList.toggle("hidden");
    videoLogo.classList.toggle('hidden');
    if (videoPlayer.paused){
        videoPlayer.play();
        
    }
    else{
        videoPlayer.pause();
    }
}

function stopVideo(){
    videoPlayer.currentTime = 0;
    videoPlayer.pause();
    play.classList.remove("hidden");
    pause.classList.add("hidden");
    videoLogo.classList.remove('hidden');
}

function progressVideo(){
    videoProgr.value = (videoPlayer.currentTime / videoPlayer.duration)*100;
    videoProgr.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${videoProgr.value}%, rgba(0, 0, 0, 0.5) ${videoProgr.value}%)`
    let min = Math.floor(videoPlayer.currentTime / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(videoPlayer.currentTime % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    time.textContent = `${min}:${sec}`
}

function setProgr(){
    videoPlayer.currentTime = (videoProgr.value * videoPlayer.duration) / 100;
    videoProgr.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${videoProgr.value}%, rgba(0, 0, 0, 0.5) ${videoProgr.value}%)`    
}

function setVolume(){
    videoPlayer.volume = volumeProgr.value/100;
    volumeProgr.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${volumeProgr.value}%, rgba(0, 0, 0, 0.5) ${videoPlayer.volume}%)`
    if(videoPlayer.volume == 0){
        volumeOff.classList.remove('hidden');
        volume.classList.add('hidden');
    }
    else{
        volume.classList.remove('hidden');
        volumeOff.classList.add('hidden');
    }
}
function toggleVolume(){
    volumeOff.classList.toggle('hidden');
    volume.classList.toggle('hidden');
    if (volumeOff.classList.contains('hidden')){
        videoPlayer.volume = 1;
        volumeProgr.value = 20;
        volumeProgr.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${volumeProgr.value}%, rgba(0, 0, 0, 0.5) ${volumeProgr.value}%)`
    }
    if(volume.classList.contains('hidden')){
        videoPlayer.volume = 0;
        volumeProgr.value = 0;
        volumeProgr.style.background = 'rgba(0, 0, 0, 0.5)';
    }

}

en.addEventListener("click", getTranslate);
ru.addEventListener("click", getTranslate);
burg.addEventListener("click", activeCl);
btnPortfolio.addEventListener("click", changeImg);
themeLight.addEventListener("click", changeTheme);
themeDark.addEventListener("click", changeTheme);
play.addEventListener("click", playPause);
pause.addEventListener("click", playPause);
videoPlayer.addEventListener("click", playPause);
videoLogo.addEventListener("click", playPause);
stop.addEventListener("click", stopVideo);
videoPlayer.addEventListener("timeupdate",progressVideo);
videoProgr.addEventListener("input", setProgr);
videoPlayer.addEventListener("ended", stopVideo);
volumeProgr.addEventListener("input", setVolume);
volumeOff.addEventListener("click", toggleVolume);
volume.addEventListener("click", toggleVolume);




import i18Obj from './translate.js';