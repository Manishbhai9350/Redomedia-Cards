import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'
import Lenis from 'lenis'


gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()

gsap.ticker.add(t => {
  lenis.raf(t * 1000)
})
gsap.ticker.lagSmoothing(0)

lenis.on('scroll',ScrollTrigger.update())

const CardRotations = [10, 0, -10]

function InRange(val, range = [0, 0]) {
  if (val >= range[0] && val < range[1]) return true;
  return false;
}

window.addEventListener('DOMContentLoaded', function () {

  const cards = gsap.utils.toArray('.card');
  const scrollText = document.querySelector('.scroll-text')


  cards.forEach((card, i) => {
    gsap.set(card, {
      transform: `rotate(${CardRotations[i]}deg) translate(-50%,950%)`
    })
  })


  ScrollTrigger.create({
    trigger: '.cards',
    start: 'top top',
    end: `+=${1 * innerHeight}`,
    onUpdate(me) {
      gsap.set(scrollText, {
        opacity: 1 - me.progress
      })
    }
  })

  const TL = gsap.timeline({
    scrollTrigger: {
      trigger: '.cards',
      start: `top -${1 * innerHeight}`,
      end: `+=${3 * innerHeight}`,
      scrub: true
    }
  })

  TL.to(cards, {
    transform: 'translate(-50%,-50%) rotate(0deg)',
    stagger: {
      each: 0.5,
      overlap: 0  // ensures no overlap
    }
  });

  const TL2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.cards',
      start: `top -${4 * innerHeight}`,
      end: `+=${7 * innerHeight}`,
      scrub: 2
    }
  })
  TL2.to(cards[0], {
    left:'1%',
    transform:'translate(0%-50%)'
  }, '<')
  TL2.to(cards[2], {
    left:'99%',
    // right:'0',
    transform:'translate(100%-50%)'
  }, '<')





  ScrollTrigger.create({
    trigger: '.cards',
    start: 'top top',
    end: `+=${7 * innerHeight}`,
    pin: true,
  })


})
