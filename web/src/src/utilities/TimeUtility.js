import moment from "moment";

const TimeUtility = {
  formatTimeToLocal: (time) => {
    return moment.utc(time).local().format("YYYY-MM-DD HH:mm:ss");
  },
};

export default TimeUtility;
