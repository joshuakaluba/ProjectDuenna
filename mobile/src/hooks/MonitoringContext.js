import { createContext } from "react";

const MonitoringContext = createContext({
  isMonitoring: false,
  setIsMonitoring: (isMonitoring) => {},
  monitor: false, 
  setMonitor: (monitor) => {}
});

export default MonitoringContext;
