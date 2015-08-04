/**
 * QueryController
 *
 * @description :: Server-side logic for managing Queries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {
    return res.json({
      todo: 'this page should be used with the find function'
    });
  }

};
