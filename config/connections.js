/**
  * Connections
  * (sails.config.connections)
  *
  * `Connections` are like "saved settings" for your adapters.  What's the difference between
  * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
  * it needs some additional information to work (e.g. your database host, password, user, etc.)
  * A `connection` is that additional information.
  *
  * For more information on configuration, check out:
  * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
  */

module.exports.connections = {

 // dev local disk
  localDiskDb: {
    adapter: 'sails-disk'
  },


 // mongodb server
  local_metricsMongoDB: {
    adapter: 'sails-mongo',
    host: 'localhost',
    //port: 45321,
    port: 27017,
    // user: 'username',
    // password: 'password',
    database: 'metrics'
  },


  /*
   * More adapters: https://github.com/balderdashy/sails
   */

};
