import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { keyframes } from "styled-components";

// Animated text gradient
const gradient = keyframes`
{
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`;

const DefaultAnimatedGradientText = styled.span`
  animation: ${gradient} 4s ease-in-out infinite;
  background: linear-gradient(to right, #ee9ca7, #ffdde1, #2193b0, #6dd5ed);
  background-size: 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function CurvedOrGradientText({
  text,
  arc,
  radius,
  textStyle,
  isCurveText,
  AnimatedGradientText,
}) {
  const characters = text.split("");
  const degree = arc / characters.length;

  // Draw for each character
  return isCurveText ? (
    <div className="text-center" style={textStyle}>
      {characters.map((char, idx) => (
        <AnimatedGradientText
          key={`text-${idx}`}
          className="position-absolute"
          style={{
            width: `${radius / (characters.length - 2)}px`,
            transform: `rotate(${degree * idx - arc / 2}deg)`,
            transformOrigin: `0 ${radius}px 0`,
          }}
        >
          {char}
        </AnimatedGradientText>
      ))}
    </div>
  ) : (
    <AnimatedGradientText
      className="text-center"
      style={textStyle}
    >
      {text}
    </AnimatedGradientText>
  );
}

CurvedOrGradientText.propTypes = {
  text: PropTypes.string.isRequired,
  arc: PropTypes.number, // arc length for the whole text
  radius: PropTypes.number, // the circle radius for the whole text to follow
  textStyle: PropTypes.object, // text style
  isCurveText: PropTypes.bool,
};

CurvedOrGradientText.defaultProps = {
  arc: 80,
  radius: 400,
  textStyle: {
    top: "20%",
  },
  isCurveText: true,
  AnimatedGradientText: DefaultAnimatedGradientText,
};
export default CurvedOrGradientText;
