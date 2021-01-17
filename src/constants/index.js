export const APP = {
  HOST: process.env.HOST ? process.env.HOST : 'https://mome-web-app.herokuapp.com',
};

export const CUSTOMER = {
  STATUS: {
    INVITED: 'invited',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
  },
};
