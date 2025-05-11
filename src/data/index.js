// Central data store index
// Import all data and export as a single object

import about from './about';
import testimonials from './testimonials';
import services from './services';
import clients from './clients';
import portfolio from './portfolio';
import blog from './blog';
import siteInfo from './siteInfo';

const dataStore = {
  about,
  testimonials,
  services,
  clients, 
  portfolio,
  blog,
  siteInfo
};

export default dataStore;