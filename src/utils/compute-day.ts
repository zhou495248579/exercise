export function computeDays(value): { day: number; hour: number } {
  const now = new Date().getTime(),
    expire = new Date(value).getTime();
  if (expire - now <= 0) {
    return {
      day: 0,
      hour: 0,
    };
  }
  // console.log(Math.abs(expire - now) / (1000 * 60 * 60 * 24))
  const day = Math.floor((expire - now) / (1000 * 60 * 60 * 24)),
    hour = Math.ceil(
      ((expire - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
  return { day, hour };
}
