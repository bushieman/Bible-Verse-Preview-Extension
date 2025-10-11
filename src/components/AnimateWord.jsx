// Letterize JS will not load if the DOM element is not loaded (such as conditionally rendered DOM elements) on application start.
// Hence we create a component that loads an empty DOM element to hold our textRef attribute

import React, { useEffect, useRef } from 'react';
import Letterize from 'letterizejs'; // Import Letterize.js
import anime from "animejs";
import 'animate.css'; // animation css


function AnimateWord({word, color}) {
    const textRef = useRef(null);

    useEffect(() => {
      if (word && textRef.current) {
        // Initialize Letterize.js with the ref
        console.log('letterize initialized')
  
        const letterizeInstance = new Letterize({
          targets: textRef.current
        });
        // Add mouseover event listener to each letter element
        letterizeInstance.listAll.forEach((letter) => {
          letter.style.display = "inline-block"; // Make each letter an inline-block element to enable transforms
          letter.style.position = "relative"; // Ensure relative positioning for proper transform effects
  
          letter.addEventListener("mouseover", function (e) {
            anime({
              targets: e.target, // Animate the target (letter)
              duration: 300,
              translateX: anime.random(-5, 5), // Move the letter left or right randomly
              translateY: anime.random(-5, 5), // Move the letter up or down randomly
              rotate: anime.random(-5, 5), // Rotate the letter randomly
              easing: "easeInOutQuad",
            });
          });
        });
      }
    }, [word]);

    return (
      <div ref={textRef} className="word" style={{color: color}}>{word}</div>
    );
}

export default AnimateWord;
