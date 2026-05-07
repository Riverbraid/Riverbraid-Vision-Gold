export const PETAL = "Vision-Gold";
export const INVARIANT = "VISION_STATIONARY";
export function verify(input) {
  if (!input || typeof input !== "object") {
    return {
      pass: false,
      stationary: false,
      signal: "vision-gold:INVALID_INPUT",
      reason: "input must be an object"
    };
  }
  const stationary =
    input.repo === "Riverbraid-Vision-Gold" &&
    input.petal === "Vision-Gold" &&
    input.ring === 1 &&
    input.invariant === "VISION_STATIONARY";
  return {
    pass: true,
    stationary,
    signal: stationary ? "vision-gold:STATIONARY" : "vision-gold:DRIFT",
    reason: stationary
      ? "Stationary fields match declared petal identity"
      : "One or more stationary fields drift from declaration"
  };
}
