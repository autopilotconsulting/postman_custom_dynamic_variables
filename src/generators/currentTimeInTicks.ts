const ticksPerMs = 10000;
const msToEpoch = 62135596800000;

export function currentTimeInTicks(): number {
  const currentTime = new Date().getTime();
  const ticks = (currentTime + msToEpoch) * ticksPerMs;

  return ticks;
}