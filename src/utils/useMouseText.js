import React, { useState, useRef } from 'react';
import styled from 'styled-components';

var TextElementStyle = styled.div`
  position: fixed;
  padding: 0 1rem;
  width: 200px;
  top: 0;
  left: 0;
  text-align: center;
  color: var(--gray);

  animation: fadeIn 200ms forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export function useMouseText(text) {
  var [showText, setShowText] = useState(false);
  var textEl = useRef(null);

  var FloatingText = function createTextElementWithRef() {
    return showText && <TextElementStyle ref={textEl}>{text}</TextElementStyle>;
  };

  return {
    FloatingText,
    updateTextPosition,
    toggleText,
  };

  function updateTextPosition(e) {
    var posX, posY;

    {
      let screenHeight = window.innerHeight;
      let screenWidth = window.innerWidth;
      // Adjusting the location of textelement based on where the mouse is, relative to the viewport.
      if (e.clientX > screenWidth * 0.8) {
        posX = e.clientX - 250;
      } else {
        posX = e.clientX + 50;
      }

      if (e.clientY > screenHeight / 5) {
        posY = e.clientY - 70;
      } else {
        posY = e.clientY - 10;
      }
    }

    if (!textEl.current) {
      // Hard interrupt if textEl.current can't be located
      setShowText(false);
      return;
    }

    var textElementStyle = textEl.current.style;
    setTimeout(() => {
      textElementStyle.top = posY + 'px';
      textElementStyle.left = posX + 'px';
    }, 0);
  }

  function toggleText(e) {
    if (e.type == 'mouseenter') {
      setShowText(true);
    } else if (e.type == 'mouseleave') {
      setShowText(false);
    }
  }
}
