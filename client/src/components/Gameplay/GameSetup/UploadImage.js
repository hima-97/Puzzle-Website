import Button from "@mui/material/Button";
import {
  convertToBase64FromInputFile,
  isFileImage,
} from "../Constants/Utility";

export default function UploadImage(props) {
  // User can change the image to uploaded image even they have selected, or return to selected image
  const { image, setImage, setIsLoading } = props;

  const onUploadImageClick = (evt) => {
    // Select image from user directory
    var file = evt.target.files[0];
    // Set null for trigger onChange the same image uploaded
    evt.target.value = null;

    // Check selected file is image
    if (!isFileImage(file)) {
      alert("Invalid Image Selected");
      return;
    }

    // Show loading in case long time to convert base64
    setIsLoading(true);
    convertToBase64FromInputFile(file)
      .then((data) => {
        setIsLoading(false);
        setImage(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setImage(null);
      });
  };

  const onClearUploadedImage = () => {
    setImage(null);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-5">
        <Button
          variant="contained"
          color="secondary"
          component="label"
          className="me-5"
        >
          Upload Image
          <input
            className="d-none"
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={onUploadImageClick}
          />
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={onClearUploadedImage}
          disabled={!image}
        >
          Clear
        </Button>
      </div>

      <img
        src={image}
        alt="Invalid Puzzle"
        className="w-50 text-center"
        style={!image ? {} : { aspectRatio: "1 / 1" }}
      />
    </div>
  );
}
