import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const CardRotations = [0, 0, 0]

function InRange(val, range = [0, 0]) {
  if (val >= range[0] && val < range[1]) return true;
  return false;
}

window.addEventListener('DOMContentLoaded', function () {

  const cards = gsap.utils.toArray('.card');
  const scrollText = document.querySelector('.scroll-text')

  gsap.set(cards, {
    y: 1000,
  })

  cards.forEach((card,i) => {
    gsap.set(card,{
      rotate:CardRotations[i]
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

  ScrollTrigger.create({
    trigger: '.cards',
    start: `top -${1 * innerHeight}`,
    end: `+=${4 * innerHeight}`,
    onUpdate(me) {
      const prog = me.progress

      cards.forEach((card, i) => {
        let range = [1 / 3 * i, 1 / 3 * (i + 1)]
        if (InRange(prog, range)) {
          const CardProg = (prog - range[0]) / (1 / 3)
          gsap.set(card, {
            y: 1000 - 1000 * CardProg
          })
        } else if (prog > range[1]) {
          gsap.set(card, {
            y: 0
          })
        }
        if (prog == 1) {
          gsap.set(cards, { y: 0 })
        }
        else if (prog == 0) {
          gsap.set(cards, { y: 1000 })
        }
      })

    },
    onLeave() {
      gsap.to(cards, { y: 0 })
    }
  })


  cards.forEach((card,i) => {
    gsap.to(card, {
      rotate: 0,
      x:i == 0 ? -220 : i == 2 ? 220 : 0,
      scrollTrigger: {
        trigger: '.cards',
        start: `top -${4 * innerHeight}`,
        end: `+=${6 * innerHeight}`,
        scrub:2
      }
    })
  })


  ScrollTrigger.create({
    trigger: '.cards',
    start: 'top top',
    end: `+=${7 * innerHeight}`,
    pin: true,
  })


})
