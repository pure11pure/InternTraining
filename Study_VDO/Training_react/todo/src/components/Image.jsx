import PropTypes from 'prop-types';

export default function Image({ imageUrl }) {
  return (
    <>
      <img src={imageUrl} width="100px" />
    </>
  );
}

Image.prototype = {
    imageUrl : PropTypes.string
}
