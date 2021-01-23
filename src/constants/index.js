export const APP = {
  HOST: process.env.HOST ? process.env.HOST : 'https://mome-web-app.herokuapp.com',
};

export const CUSTOMER = {
  STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
  },
};

export const PAYMENT = {
  STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
};
