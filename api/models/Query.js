/**
* Query.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    question: {
      type: 'string',
      required: true
    },

    value: { type: 'string' },
    count: { type: 'string' },
    date: { type: 'string' }
  }
};
