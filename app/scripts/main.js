/**
 * Created by jarek on 01/04/2017.
 */
'use strict';

import jQuery from 'jquery';
import * as AOS from 'aos';
import 'babel-core/register';
import 'babel-polyfill';

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

  /*static async wait(fn, time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if(typeof fn === Function) {
          fn();
        }
        return resolve();
      }, time);
    });
  }*/
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

  async typing(_text, speed) {
    return new Promise(resolve => {
      this.speed = speed;
      this.text = _text;
      this.len = _text.length;

      this.type(() => {
        return resolve();
      });
    });
  }

  type(callback) {
    if (this.i >= this.len)
      return callback();

    setTimeout(() => {
      if (typeof this.text[this.i] !== 'undefined') {
        this.typedText += this.text[this.i];
        this.i++;
        this.setText(this.typedText);
        this.type(callback);
      }
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

  start() {
    Main.show(this.element);
    for (let i = 1; i <= 78; i++) {
      this.fillPhotos(i);
    }

    setTimeout(() => {
      AOS.refresh();
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 1000);
  }

  fillPhotos(i) {
    $('#photos').append(`
    <div class="col-6">
      <div class="photo photo${i}" data-aos="fade-up" data-aos-anchor-placement="top-center">
        <img src="/assets/images/cropped/photo${i}.jpg" alt="">
      </div>
    </div>`);
  }
}

class Sequence {
  constructor() {
    this.run()
      .then(() => {
        console.log('all done');
      });
  }

  async run() {
    const main = new Main('main');
    const logoHero = $('#logoHero');
    const text1 = new Text('timeTo');
    const pointer = $('#pointer');
    const scene2 = new Scene2('scene2');
    let hidePointer = false;
    let clicked = false;
    let typedText1 = 'time to say goodbye...';

    await this.timeout(3000);
    await text1.typing(typedText1, 150);
    await this.timeout(2000);
    typedText1 += ' Plej';
    await text1.typing(typedText1, 150);

    logoHero.addClass('active');
    logoHero.mouseover(() => {
      console.log('over');
      if (!hidePointer)
        Main.hide(pointer);

      hidePointer = true;
    });

    logoHero.on('click', () => {
      logoHero.addClass('animated zoomOut');
      clicked = true;

      setTimeout(() => {
        logoHero.hide();

        main.hideMain();
        scene2.start();
      }, 500)
    });

    await this.timeout(3000);
    if (!hidePointer || !clicked) {
      Main.show(pointer);
    }
  }

  async timeout(delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve();
      }, delay);
    });
  }
}

$(document).ready(() => {
  AOS.init();

  setTimeout(() => {
    new Sequence();
  }, 500);
});

