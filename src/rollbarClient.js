import Rollbar from 'rollbar';
import config from '../rollbar.config';

const rollbar = new Rollbar(config);

export default rollbar;