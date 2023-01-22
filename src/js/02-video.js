import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000)
);

const savedCurrentTime = localStorage.getItem('videoplayer-current-time');

if (savedCurrentTime) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}
