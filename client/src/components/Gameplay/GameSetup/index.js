import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import GameConfiguration from "./GameConfiguration";
import { GameState } from "../Constants";
import UploadImage from "./UploadImage";
import { checkBase64Image } from "../Constants/Utility";
import CustomDialog, { DialogData } from "../../CustomDialog";
import Loading from "../../Loading";
import GameConfig from "./GameConfig";
import { GameType, GameDifficulty, GameTime } from "../Constants";

const steps = ["Select or Upload Image", "Set Game Up"];

export default function Setup(props) {
  // setGameConfig when done all setup steps
  const { selectedImage, setGameState, setGameConfig } = props;

  // Temporary config for rerendering this component
  const [tempGameConfig, setTempGameConfig] = useState(
    new GameConfig(
      GameDifficulty.defaultValue,
      GameType.SWAP_PUZZLE,
      GameTime.defaultValue,
      selectedImage
    )
  );

  // Loading and Dialog data for utility components
  const [isLoading, setIsLoading] = useState(false);
  const [dialogData, setDialogData] = useState(
    JSON.parse(JSON.stringify(DialogData))
  );

  // Steps for setup game data
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setGameConfig(tempGameConfig);
      setGameState(GameState.PLAYING);
      return;
    }

    // Check if this is valid base64 data image, so user can go to next step
    setIsLoading(true);
    checkBase64Image(tempGameConfig.image).then((isImage) => {
      setIsLoading(false);
      if (isImage) setActiveStep(activeStep + 1);
      else
        setDialogData({
          isOpen: true,
          closeDialog: () => setDialogData({ isOpen: false }),
          title: "Error",
          msg: "Invalid image",
        });
    });
  };

  const handleBack = () => {
    // Reset overall game config
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="m-5 px-5">
      <Loading isLoading={isLoading} />
      <CustomDialog dialogData={dialogData} />

      <Stepper activeStep={activeStep} className="mb-5">
        {steps.map((label, _) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length - 1 ? (
          <GameConfiguration
            tempConfig={tempGameConfig}
            setTempConfig={setTempGameConfig}
          />
        ) : (
          <UploadImage
            image={tempGameConfig.image}
            setImage={(image) => {
              tempGameConfig.image = image ? image : selectedImage;
              setTempGameConfig(tempGameConfig);
            }}
            setIsLoading={setIsLoading}
          />
        )}

        <div className="h-100 d-flex justify-content-between mt-5">
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <div sx={{ flex: "1 1 auto" }} />
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={
              activeStep === steps.length - 1
                ? !tempGameConfig || tempGameConfig.isInvalidData()
                : !tempGameConfig.image
            }
          >
            {activeStep === steps.length - 1 ? "Start Game" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
