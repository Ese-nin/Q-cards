export function dateToDMY(date: string) {
  let d = new Date(date).getDate();
  let m = new Date(date).getMonth() + 1;
  let y = new Date(date).getFullYear();
  return (d <= 9 ? "0" + d : d) + "." + (m <= 9 ? "0" + m : m) + "." + y;
}
