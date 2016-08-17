const _ = require('lodash');
const ERR = require('../error.json');

var occurrence = {};

exports.onBegin = function(rules) {
    _.forOwn(rules, (v, k) => {
        occurrence[k] = 0;
    });
};

exports.onNode = function(node) {
    occurrence[node.nodeName]++;
};

exports.onEnd = function(rules, engine) {
    _.forOwn(rules, (v, k) => {
        if (v.mandatory && !occurrence[k]) {
            var err = ERR.MANDATORY_TAG_MISSING;
            engine.createError(err.code, err.message);
        }
    });
};