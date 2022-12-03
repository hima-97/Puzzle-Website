import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import CurvedOrGradientText from "../../../Utility/CurvedOrGradientText";
import Button from "@mui/material/Button";

// Animated text gradient
const lostGradient = keyframes`
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

const LosttAnimatedGradientText = styled.span`
  animation: ${lostGradient} 4s ease-in-out infinite;
  background: linear-gradient(to right, #404041, #090979, #158095);
  background-size: 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function ResultPopup({ result, image, setIsShowResultPopup }) {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  const close = () => {
    setIsShowResultPopup(false);
  };

  return (
    <div className="position-fixed top-0 start-0 vw-100 vh-100 bg-secondary">
      {result ? (
        <div className="d-flex w-100 h-100 align-items-center justify-content-center">
          {/* Particles */}
          <Confetti width={width} height={height} />
          {/* Content */}
          <div className="d-flex flex-column align-items-center w-50 mb-5 pb-5">
            {/* Title */}
            <CurvedOrGradientText
              text="Congratulations"
              textStyle={{
                fontWeight: "bold",
                fontSize: "3.3rem",
                height: "150px",
              }}
              arc={80}
              radius={400}
            />
            {/* Img and btn */}
            <img
              src={image}
              alt="Invalid Puzzle"
              className="w-50 text-center mb-3"
              style={{ aspectRatio: "1 / 1" }}
            />
            <div className="d-flex gap-3">
              <Button variant="contained" color="success" onClick={backToHome}>
                Back to Home
              </Button>
              <Button variant="contained" color="error" onClick={close}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex w-100 h-100 align-items-center justify-content-center">
          {/* Particles */}
          <Confetti
            drawShape={(ctx) => {
              ctx.beginPath();
              for (let i = 0; i < 22; i++) {
                const angle = 0.35 * i;
                const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                ctx.lineTo(x, y);
              }
              ctx.stroke();
              ctx.closePath();
            }}
            numberOfPieces={50}
            initialVelocityY={3}
            opacity={0.5}
            colors={["#404041", "#090979", "#158095"]}
          />
          {/* Content */}
          <div className="d-flex flex-column align-items-center w-50 mb-5 pb-5">
            {/* Title */}
            <CurvedOrGradientText
              text="You lose!"
              textStyle={{
                fontWeight: "bold",
                fontSize: "3.3rem",
                height: "120px",
              }}
              arc={40}
              radius={400}
              isCurveText={false}
              AnimatedGradientText={LosttAnimatedGradientText}
            />
            <span className="mb-3" style={{ fontWeight: "bold" }}>
              The Final Should Look Like this
            </span>
            {/* Img and btn */}
            <img
              src={image}
              alt="Invalid Puzzle"
              className="w-50 text-center mb-3"
              style={{ aspectRatio: "1 / 1" }}
            />
            <div className="d-flex gap-3">
              <Button variant="contained" color="success" onClick={backToHome}>
                Back to Home
              </Button>
              <Button variant="contained" color="error" onClick={close}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
