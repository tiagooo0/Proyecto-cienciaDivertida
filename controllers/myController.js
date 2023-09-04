const OneModel = require('../models/myModel');
const moment = require('moment');

exports.inicio = (req, res) => {
    res.status(200).render('index');


};
exports.met = (req, res) => {
    res.status(200).render('mate');


};