import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const options = {
  autoplay: true,
  background: true,
  byline: false,
  portrait: false,
  title: false
}

const frameEl = document.querySelector('#vimeo-player');
const player = new Player(frameEl, options);
player.on('timeupdate', throttle(playedTime, 1000));
if(localStorage.getItem("videoplayer-current-time") !== null){
  player.setCurrentTime(localStorage.getItem("videoplayer-current-time"))
}
function playedTime(e) {
 localStorage.setItem('videoplayer-current-time', `${e.seconds}`);
}