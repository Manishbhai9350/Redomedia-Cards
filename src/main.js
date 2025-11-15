import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const CardRotations = [10, 0, -10]
const Positions = [
  {
    left: '5%',
    right: 'auto',
    transform: 'rotate(-85deg) translate(-50%,-50%)'
  },
  {
    left: '50%',
    right: 'auto',
    transform: 'rotate(0deg) translate(-50%,-50%)'
  },
  {
    left: 'auto',
    right: '5%',
    transform: 'rotate(85deg) translate(-50%,-50%)'
  },
]

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
      end: `+=${4 * innerHeight}`,
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
      start: `top -${4.5 * innerHeight}`,
      end: `+=${7 * innerHeight}`,
      scrub: true
    }
  })
  TL2.to(cards[0], {
    left:'-5%',
    transform:'translate(0%-50%)'
  }, '<')
  TL2.to(cards[2], {
    left:'105%',
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
