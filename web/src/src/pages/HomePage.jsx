import { useParams } from "react-router-dom";
import MonitorService from "../services/MonitorService";
import { useEffect } from "react";

const HomePage = () => {
  let { guid } = useParams(); // Access the GUID from the URL

  useEffect(() => {
    (async () => {
      const isValidGuid = (guid) => {
        // TODO move this validation function to a utility function in a separate file
        const regex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(guid);
      };

      // Validate the GUID
      if (isValidGuid(guid)) {
        console.log("GUID is valid:", guid);
        await _getMonitorData(guid);
        // Perform actions for valid GUID
      } else {
        console.log("Invalid GUID:", guid);
        // Handle invalid GUID case, such as showing an error message or redirecting
      }
    })();
  }, [guid]);

  const _getMonitorData = async (guid) => {
    try {
      const data = await MonitorService.getMonitorData(guid);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <section>
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Home
          </h1>
        </div>
      </section>
    </>
  );
};

export default HomePage;
