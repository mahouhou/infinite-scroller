import "./App.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function App() {
  // gsap.registerPlugin(ScrollTrigger);

  const imgWidth = "400px"
  const heroRef = useRef(null);

  const BOX = '.hero'
  console.log(heroRef.current)
  // const BOXES = gsap.utils.toArray(BOX)
  // const DURATION = 1
  // const STAGGER = 0.1
  // const OFFSET = 0
  // const CYCLE_DURATION = STAGGER * BOXES.length
  // const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET

  useEffect(() => {
    gsap.timeline().fromTo(BOX, {
      xPercent: 100
    }, {
      xPercent: -100,
      repeat: -1,
      stagger: 0.5,
      duration: 1,
      ease: 'none',
    })
  }, []);

  const heroImages = heroArray.map((hero) => {
    return (
      <img
        src={require("./assets/images/hero/" + hero + ".jpg")}
        alt={hero}
        key={hero}
        className="hero"
        style={{width: `${imgWidth}`}}
        ref={heroRef}
      />
    );
  })

  return (
    <div className="App">
      <main>
        <div id="gallery">
          {heroImages}{heroImages}
        </div>
      </main>
    </div>
  );
}

const heroArray = ["maple0", "maple1", "maple2", "maple3", "maple4"];
