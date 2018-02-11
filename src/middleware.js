exports.missingParamsValidator = (args) => {
    return (req, res, next) => {
        args.forEach((arg) => {
            if (typeof req.params[arg] == 'undefined')
                return next({status: 400, message: 'Missing params', code: 100, extra: arg});
        });
        next();
    };
};

exports.missingQueryValidator = (args) => {
    return (req, res, next) => {
        args.forEach((arg) => {
            if (typeof req.query[arg] == 'undefined')
                return next({status: 400, message: 'Missing query', code: 100, extra: arg});
        });
        next();
    };
};

exports.missingBodyValidator = (args) => {
    return (req, res, next) => {
        args.forEach((arg) => {
            if (typeof req.body[arg] == 'undefined')
                return next({status: 400, message: 'Missing body', code: 100, extra: arg});
        });
        next();
    };
};

exports.asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
