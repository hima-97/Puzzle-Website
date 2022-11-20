export function shuffle(a) {
  const b = a.slice();

  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }

  return b;
}

export function convertSecondsToHoursString(secTime) {
  const seconds = Math.floor(secTime % 60);
  const minutes = Math.floor((secTime / 60) % 60);
  const hours = Math.floor((secTime / 60 / 60) % 24);

  return `${hours}:${minutes}:${seconds}`;
}

export function convertToBase64FromInputFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}

export function checkBase64Image(base64String) {
  let image = new Image();
  image.src = base64String;
  return new Promise((resolve) => {
    image.onload = function () {
      if (image.height === 0 || image.width === 0) {
        resolve(false);
        return;
      }
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
}

export function clamp(number, min, max) {
  if (!number) return min;
  return Math.max(min, Math.min(number, max));
}
