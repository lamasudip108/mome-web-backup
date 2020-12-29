import * as TransactionService from '../services/transaction.service';


/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function finaAllByUserId(req,res,next){

  TransactionService.finaAllByUserId(req.param.userid)
    .then((data) => res.json({ data }))
    .catch((err) => console.log(err,'er'));
}
