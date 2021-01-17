/**
 * We can define general constant over here
 *
 */
export const Constant = {
  app:{
    host : process.env.HOST ? process.env.HOST : 'https://mome-web-app.herokuapp.com' ,
  },
  users: {
    status: {
      invited: 'invited',
      active: 'active',
      inactive: 'inactive',
      deleted: 'deleted'
    }
  },
  payment :{
    status:{
      pending:'pending',
      success:'success',
      failed:'failed',
      cancelled :'cancelled',
      server:'server'
    }
  }
};

export default Constant;

