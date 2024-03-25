import PropTypes from "prop-types";

PrimaryListItem.propTypes = {
  description: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default function PrimaryListItem(props) {
  const { description, value } = props;
  return (
    <>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {description}
            </p>
          </div>
        </div>
        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="mt-1 text-sm leading-5 text-gray-500">{value}</p>
        </div>
      </li>
    </>
  );
}
