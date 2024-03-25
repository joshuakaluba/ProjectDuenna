import PropTypes from "prop-types";
import TimeUtility from "../utilities/TimeUtility";
import PrimaryListItem from "./PrimaryListItem";

NotesContainer.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default function NotesContainer(props) {
  const { notes } = props;
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {notes?.length > 0 &&
        notes.map((note, i) => {
          return (
            <PrimaryListItem
              key={i}
              description={note.textContext}
              value={TimeUtility.formatTimeToLocal(note.dateCreated)}
            />
          );
        })}
    </ul>
  );
}
