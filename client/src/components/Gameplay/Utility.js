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
