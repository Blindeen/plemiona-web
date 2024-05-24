import axios from 'axios';

// Axios base parameters
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';