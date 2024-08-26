export const defaultSelected = {
  from: undefined,
  to: undefined,
};

export const generateBlockedPeriods = ({ bookings, today }) => {
  today.setHours(0, 0, 0, 0);
  const disabledDays = [
    ...bookings.map((booking) => ({
      from: booking.checkIn,
      to: booking.checkOut,
    })),
    { from: new Date(0), to: new Date(today.getTime() - 24 * 60 * 60 * 1000) },
  ];
  return disabledDays;
};
export const generateDateRanges = (range) => {
  if (!range || !range.from || !range.to) return [];
  let currentDate = new Date(range.from);
  const endDate = new Date(range.to);
  const DateRange = [];
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    DateRange.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return DateRange;
};

export const generateDisabledDates = (disabledDays) => {
  if (disabledDays.length === 0) return {};
  const disabledDates = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  disabledDays.forEach((range) => {
    if (!range.from || !range.to) return;

    const endDate = new Date(range.to);
    if (endDate < today) return;

    let currentDate = new Date(range.from);
    if (currentDate < today) currentDate = new Date(today);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      disabledDates[dateString]=true
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  return disabledDates;
};

export const calculateDaysBetween = ({ checkIn, checkOut }) => {
  const diffInMs = Math.abs(checkOut.getTime() - checkIn.getTime());
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
};
