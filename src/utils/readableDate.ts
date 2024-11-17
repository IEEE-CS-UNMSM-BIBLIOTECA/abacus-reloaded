const readableDate = (date: Date) => date.toLocaleDateString('es', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default readableDate;
