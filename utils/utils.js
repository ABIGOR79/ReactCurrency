export const URL = "https://api.currencybeacon.com/v1/timeseries";
export const API_KEY = "y9Lr8Jt6aK3be0TtboYtqS81JCM002kw";
export const BASE_CURRENCY = "try";

export const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Форматируем дату в формат yyyy-mm-dd
}

export const getWeekAgo = () => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return weekAgo.toISOString().split('T')[0]; // Форматируем дату в формат yyyy-mm-dd
}