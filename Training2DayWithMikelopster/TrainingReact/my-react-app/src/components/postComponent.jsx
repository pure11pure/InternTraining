import PropTypes from "prop-types";

export default function Post({ title, content }) {
  return (
    <div className="p-3 w-[60%] grid mx-auto">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{content}</p>
    </div>
  );
}

Post.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
