export const CHANGE_START_DAY = "CHANGE_START_DAY";
export const CHANGE_END_DAY = "CHANGE_END_DAY";

export const changeStartDay = date => ({ type: CHANGE_START_DAY, date });
export const changeEndDay = date => ({ type: CHANGE_END_DAY, date });
