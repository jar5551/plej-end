/**
 * Created by jarek on 01/04/2017.
 */

import jQuery from 'jquery';

const $ = jQuery;
window.jQuery = window.$ = $;

//let bootstrap = require('bootstrap');

class Main {
  constructor(elId) {
    this.init($('#' + elId));
  }

  init(mainEl) {
    Main.show(mainEl);
    this.element = mainEl;
  }

  static show(element) {
    element.addClass('showing');
    element.show();

    setTimeout(() => {
      element.removeClass('showing');
    }, 400);
  }

  hideMain() {
    Main.hide(this.element);
  }

  static hide(element) {
    element.addClass('hiding');

    setTimeout(() => {
      element.removeClass('hiding');
      element.hide();
    }, 400);
  }
}

class Text {
  constructor(textContainer) {
    this.textContainer = $('#' + textContainer);
    this.text = '';
    this.typedText = '';
    this.speed = 0;
    this.len = 0;
    this.i = 0;
  }

  typing(_text, speed) {
    //this.textContainer.text(text);
    const len = _text.length;
    let i = 0;
    let text = '';
    this.speed = speed;
    this.text = _text;
    this.len = _text.length;

    this.type();
  }

  type() {
    if(this.i >= this.len)
      return;

    setTimeout(() => {
      this.typedText += this.text[this.i];
      this.i++;
      this.setText(this.typedText);
      this.type();
    }, this.variableSpeed(this.speed));
  }

  setText(_text) {
    this.textContainer.text(_text);
  }

  variableSpeed(speed) {
    const variable = (Math.random() * 150) + 50;
    return variable / 100 * speed;
  }
}

class Scene2 {
  constructor(element) {
    this.element = $('#' + element);
  }

  start(colors) {
    this.colors = colors;
    Main.show(this.element);
    for(let i = 1; i<=60; i++) {
      this.fillPhotos(i);
    }
  }

  fillPhotos(i) {
    $('#photos').append(`<div class="photo photo${i}">
      <img src="/assets/images/cropped/photo${i}.jpg" alt="">
    </div>`);
  }

}

$(document).ready(() => {
  setTimeout(() => {
    const main = new Main('main');
    const logoHero = $('#logoHero');
    const text1 = new Text('timeTo');
    const pointer = $('#pointer');
    const scene2 = new Scene2('scene2');
    let hidePointer = false;
    let clicked = false;
    const colors = [
      '0e76bc', '283891', 'f1592a', 'ed217c', '662d91', 'ed1c24', 'fbc22c', 'f7941d'
    ];

    setTimeout(() => {
      let typedText1 = 'time to say goodbye...';
      text1.typing(typedText1, 150);

      setTimeout(() => {
        typedText1 += ' Plej';
        text1.typing(typedText1, 150);

        logoHero.addClass('active');
        logoHero.mouseover(() => {
          console.log('over');
          if(!hidePointer)
            Main.hide(pointer);

          hidePointer = true;
        });

        logoHero.on('click', function () {
          logoHero.addClass('animated zoomOut');
          clicked = true;

          setTimeout(() => {
            logoHero.hide();

            main.hideMain();
            scene2.start(colors);
          }, 500)
        });

        setTimeout(() => {
          if(hidePointer || clicked)
            return;

          Main.show(pointer);
        }, 3000);

      }, 7000);
    }, 3000);

  }, 500);
});

