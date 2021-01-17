import path from 'path';

import * as CustomerService from '@services/customer.service';

/**
 * Verify email link by jwt token
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function verifyAccountByToken(req, res) {
  const { token } = req.params;

  CustomerService.verifyAccount(token)
    .then((data) => {
      if (undefined === data) {
        res.sendFile(path.join(__dirname, '../../public/customer/link_expired.html'));
      } else {
        res.sendFile(path.join(__dirname, '../../public/customer/account_verified.html'));
      }
    })
    .catch((err) => console.log(err));

}
