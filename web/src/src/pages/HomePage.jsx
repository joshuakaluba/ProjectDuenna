import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import validator from "validator";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import FullScreenLoadingComponent from "../components/FullScreenLoadingComponent";
import MonitorService from "../services/MonitorService";
import NotesContainer from "../components/NotesContainer";
import NotFoundCard from "../components/NotFoundCard";
import environment from "../../environment.json";
import LocationUtility from "../utilities/LocationUtility";
import TimeUtility from "../utilities/TimeUtility";
import PrimaryListItem from "../components/PrimaryListItem";

const libraries = ["places"];
const mapContainerStyle = {
  width: "550px",
  height: "550px",
};
const HomePage = () => {
  let { guid } = useParams();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: environment.googleMapsApiKey,
    libraries,
  });

  const [notes, setNotes] = useState([]);
  const [showNotFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState([]);
  const [monitor, setMonitor] = useState(null);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    (async () => {
      setNotFound(true);
      setLoading(true);
      if (validator.isUUID(guid)) {
        const result = await _getMonitorData(guid);
        if (result) {
          if (result?.notes) {
            setNotes(result.notes);
          }

          if (result?.locations) {
            const coords = result.locations.map((obj) => ({
              lat: obj.latitude,
              lng: obj.longitude,
              dateCreated: obj.dateCreated,
            }));
            const center = LocationUtility.findCenter(coords);
            setCenter(center);
            setCoords(coords);
          }
          setMonitor(result.monitor);
          setNotFound(false);
        }
      }
      setLoading(false);
    })();
  }, [guid]);

  const _getMonitorData = async (guid) => {
    try {
      const data = await MonitorService.getMonitorData(guid);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  if (showNotFound) {
    return <NotFoundCard />;
  }

  return (
    <section>
      <div className="flex flex-wrap -mx-2" style={{ marginTop: "40px" }}>
        <div className="w-full md:w-1/2 px-2">
          <div className="p-4 ">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={17}
              className={"bordered-section"}
              center={center}
            >
              {coords?.length > 0 &&
                coords.map((coord, i) => {
                  return (
                    <MarkerF
                      key={i}
                      position={{ lat: coord.lat, lng: coord.lng }}
                      title={TimeUtility.formatTimeToLocal(coord.dateCreated)}
                    />
                  );
                })}
            </GoogleMap>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="p-4">
            {monitor !== null && (
              <div className="more-info-section bordered-section">
                <div className="text-2xl font-semibold text-gray-900">
                  Monitor Info
                </div>
                <ul role="list" className="divide-y divide-gray-100">
                  <PrimaryListItem
                    description="Created At"
                    value={TimeUtility.formatTimeToLocal(monitor.createdAt)}
                  />
                  <PrimaryListItem
                    description="Manually Triggered"
                    value={monitor.isManuallyTriggered ? "Yes" : "No"}
                  />

                  {monitor.isManuallyTriggered && (
                    <PrimaryListItem
                      description="Triggered At"
                      value={TimeUtility.formatTimeToLocal(
                        monitor.timeManuallyTriggered
                      )}
                    />
                  )}
                </ul>
              </div>
            )}

            {notes?.length > 0 && (
              <div className="bordered-section">
                <div className="text-2xl font-semibold text-gray-900">
                  Notes
                </div>
                <NotesContainer notes={notes} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
