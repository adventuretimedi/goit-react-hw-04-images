import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ isVisible }) => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#6C75EB"
      ariaLabel="three-dots-loading"
      visible={isVisible}
      wrapperStyle={{ justifyContent: 'center' }}
    />
  );
};

Loader.propTypes = {
  isVisible: PropTypes.bool,
};

export default Loader;
