function getTimes() {
  const offset = 1000 * 60 * 60 * 9;
  const today = new Date(new Date().getTime() + offset);
  const isoString = today.toISOString();
  const hourMinites = isoString.split('T')[1].split(':');

  return hourMinites[0] + hourMinites[1];
}

export { getTimes };
