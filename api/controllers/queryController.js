/**
 * QueryController
 *
 * @description :: Server-side logic for managing Queries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {

    var today = new Date();
    var query_date = today.toISOString().slice(0,10);

    Query.find({Date: query_date}).exec(function (err, return_record) {

      return res.json(query_date);

      return res.view("qMetrics", {
        qRecord: return_record
      });
    });
    }
};
