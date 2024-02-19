import axios from "axios";
import env from "../../env.json";

const MonitorService = {
  async getMonitorData(monitorId) {
    const url = `${env.apiEndPoint}/api/v1/monitors/${monitorId}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  },
};

export default MonitorService;
