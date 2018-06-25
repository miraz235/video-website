import VideoJS from "video.js"
console.log(VideoJS);
const options = {
    controls: true,
    preload: 'auto'
}
let player = VideoJS("my-player", options);
player.on('ready', function(){
    this.play();
})