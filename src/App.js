import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from "https://cdn.skypack.dev/gsap@3.11.0";
import ScrollTrigger from "https://cdn.skypack.dev/gsap@3.11.0/ScrollTrigger";

export default function App() {
  gsap.registerPlugin(ScrollTrigger);

  const imgWidth = "400px";

  useEffect(() => {
    const BOXES = gsap.utils.toArray(".hero");
    const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

    const STAGGER = 0.25; // 0.5
    const OFFSET = 0; // 5 * STAGGER
    const DURATION = 1;

    const LOOP = gsap.timeline({
      paused: true,
      repeat: -1,
      ease: "none",
    });

    SHIFTS.forEach((BOX, index) => {
      const BOX_TL = gsap.timeline()
      .fromTo(
        BOX, {
          // xPercent: 100,
          left: "100vw",
        }, {
          // xPercent: -200, // don't use xPercent
          left: 0,
          duration: DURATION / 2,
          yoyo: true,
          repeat: -1, //1 // -1 prevents images from getting stuck but then they stack instead
          ease: "linear",
          // immediateRender: false, // don't use immediateRender here
        }, 0 )
        .fromTo(
          BOX, {
            zIndex: BOXES.length - index - 1,
          }, {
            zIndex: `-=${BOXES.length + 1}`,
            duration: DURATION,
            ease: "none",
            immediateRender: false,
          }, 0 )
      LOOP.add(BOX_TL, index * STAGGER);
    });

    const CYCLE_DURATION = STAGGER * BOXES.length;
    const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET;
    // const END_TIME = START_TIME + CYCLE_DURATION;

    const LOOP_HEAD = gsap.fromTo(
      LOOP, {
        totalTime: START_TIME,
      }, {
        totalTime: `+=${CYCLE_DURATION}`,
        duration: 10,
        ease: "none",
        repeat: -1,
        paused: true,
      })
    
    // There is one position counter that counts up or down to 10 each loop,
    // accumulating or decumulating by 10 depending on scroll direction.
    // Another position counter doesn't accumulate/decumulate with each loop,
    // but stays between -10 and 10 depending on scroll direction.
    const PLAYHEAD = { position: 0 }
    const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration())

    // tween updates position of PLAYHEAD
    const SCRUB = gsap.to(PLAYHEAD, {
      position: 0,
      onUpdate: () => {
        // wrap PLAYHEAD.position between 0 and 10
        // and set result as totalTime of LOOP_HEAD
        LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
        console.log(`PLAYHEAD.position: ${PLAYHEAD.position}`)
      },
      paused: true,
      duration: 1, //I think this is how long it takes for a single scroll event to complete
      ease: 'power3', //none
    })

    let iteration = 0
    
    const TRIGGER = ScrollTrigger.create({
      markers: true,
      start: 0,
      end: '+=50000',
      horizontal: false,
      pin: '#gallery',
      onUpdate: self => {
        // SCROLL is a number between start and end values
        const SCROLL = self.scroll()
        // Go forwards in time:
        if (SCROLL > self.end - 1) {
          // triggered when scrollbar reaches end of scroller
          // positive counter counts up
          WRAP(1, 1)
        // Go backwards in time:
        } else if (SCROLL < 1 && self.direction < 0) {
          // triggered when scrollbar reaches start of scroller
          // negative counter counts down
          WRAP(-1, self.end - 1)
        } else {
          // triggered with every scroll event
          // self.progress is a value between 0 and 1
          SCRUB.vars.position = (iteration + self.progress) * LOOP_HEAD.duration()
          // console.log(`SCRUB.vars.position: ${SCRUB.vars.position}`)
          // console.log(`iteration: ${iteration}`)
          SCRUB.invalidate().restart()
        }
      }
    })

    const WRAP = (iterationDelta, scrollTo) => {
      //counts up or down depending on scroll direction
      iteration += iterationDelta
      //possible to count too many times by holding the scrollbar offscreen
      // console.log(`iteration: ${iteration}`)
      //scroll to start (+1px) or end (-1px) of scroller
      TRIGGER.scroll(scrollTo)
      TRIGGER.update()
    }

  }, []);

  const heroImages = heroArray.map((hero) => {
    return (
      <img
        src={require("./assets/images/hero/" + hero + ".jpg")}
        alt={hero}
        key={hero}
        className="hero"
        style={{ width: `${imgWidth}` }}
      />
    );
  });

  return (
    <div className="App">
      <main>
        <div id="gallery">{heroImages}</div>
      </main>
    </div>
  );
}

const heroArray = [
  "maple0",
  "maple1",
  "maple2",
  "maple3",
  "maple4",
  "maple5",
  "maple6",
  "maple8",
  "maple9",
];
