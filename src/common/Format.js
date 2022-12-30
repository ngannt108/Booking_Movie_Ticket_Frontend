export const FormatDate = (date) => {
  if (date) {
    const d = new Date(date); //d.toLocaleString("en-AU")//

    return d.toLocaleString("en-AU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }); // `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  }
  return "";
};

export const FormatTime = (date) => {
  if (date) {
    const d = new Date(date); //d.toLocaleString("en-AU")//
    const time = d.toLocaleString("en-AU", {
      hour: "numeric",
      minute: "numeric",
    });
    return time;
  }
  return "";
};
