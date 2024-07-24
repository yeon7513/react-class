function DateText({ value }) {
  if (!value) return;
  return new Date(value).toLocaleDateString('ko-KR');
}

export default DateText;
