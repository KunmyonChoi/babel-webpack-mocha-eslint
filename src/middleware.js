exports.missingParamsValidator = (args) => {
    return (req, res, next) => {
        args.forEach((arg) => {
            if (typeof req.params[arg] == 'undefined')
                return next({status: 400, message: 'Missing params', payload: arg});
        });
        next();
    };
};

exports.missingQueryValidator = (args) => {
    return (req, res, next) => {
        args.forEach((arg) => {
            if (typeof req.query[arg] == 'undefined')
                return next({status: 400, message: 'Missing query', payload: arg});
        });
        next();
    };
};

exports.missingBodyValidator = (args) => {
    return (req, res, next) => {
        args.forEach((arg) => {
            if (typeof req.body[arg] == 'undefined')
                return next({status: 400, message: 'Missing body', payload: arg});
        });
        next();
    };
};

