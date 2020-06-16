import * as dotenv from 'dotenv';

dotenv.config();
const CONFIG: any = {};

CONFIG['BASE_URL'] = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
CONFIG['API_URL'] = process.env.REACT_APP_API_URL || 'https://api.burgess-shared-tour.devserver.london/api';
CONFIG['VOICE_SERVICE_URL'] = process.env.REACT_APP_VOICE_SERVICE_URL || 'https://voice.burgess-shared-tour.devserver.london';

export default CONFIG;