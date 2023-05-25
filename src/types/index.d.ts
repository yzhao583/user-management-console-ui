/* eslint-disable no-var */
import ChromeApi from '@redhat-cloud-services/frontend-components/ChromeApi';

declare global {
  var insights: ChromeApi;
}

interface User {
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  id: string,
  org_admin: boolean,
  is_internal: boolean,
  org_id: string,
  type: string,
}

export {User};
