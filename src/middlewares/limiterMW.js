const { Request, Response, NextFunction } = require('express');
const rateLimit = require('express-rate-limit');

exports.softLimiter = rateLimit({
    windowMs: 60 * 1000, // 1분
    max: 10,
    handler(req, res) {
      res.json({message:'요청이 너무 빈번합니다.'});
    },
  });
exports.hardLimiter = rateLimit({
    windowMs: 60 * 1000, // 1분
    max: 2,
    handler(req, res) {
      res.json({message:'요청이 너무 빈번합니다.'});
    },
  });