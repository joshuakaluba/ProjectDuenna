import axios from "axios";
import environment from "../../environment.json";

const MonitorService = {
  async getMonitorData(monitorId) {
    const url = `${environment.apiEndPoint}/api/v1/monitors/${monitorId}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  },
};

export default MonitorService;
