export const calculationTotalDurationTime = (
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number => {
  const [starHour, startMint] = startTime.split(":").map(Number);
  const startHourAndMInt = starHour * 60 + startMint;

  const [endHour, endMint] = endTime.split(":").map(Number);
  const endtHourAndMInt = endHour * 60 + endMint;

  const totalDuration = (endtHourAndMInt - startHourAndMInt) / 60;
  const newTotalCost = totalDuration * pricePerHour;

  return newTotalCost;
};
