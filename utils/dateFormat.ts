import moment from "moment"
export const fomartForHumans = (date: string) => {
  return moment(date).format("LL");
}