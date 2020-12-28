/**
 * We can define general constant over here
 *
 */
export const Constant = {
  app:{
    host : process.env.APP_HOST,
  },
  users: {
    status: {
      invited: 'invited',
      active: 'active',
      inactive: 'inactive',
      deleted: 'deleted'
    }
  }
};

export default Constant;

