import { DatePicker } from "./DatePicker";
import { utils } from "../../utils/utils";

export const { getFormatedDate, getToday } = new utils({ isGregorian: true });
export default DatePicker;
