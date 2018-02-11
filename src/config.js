var config = {
    'production': {
        'http': {
            'port': 18080
        },
        'db': {
            'host': '',
            'port': 3685
        },
        'mq': {
            'url': ''
        }
    },
    'qa': {
        'http': {
            'port': 18080
        },
        'db': {
            'host': '',
            'port': 3685
        },
        'mq': {
            'url': ''
        }

    },
    'default': {
        'http': {
            'port': 18080
        },
        'db': {
            "connectionLimit": 10,
            "host" : "50.1.111.62",
            "port": 3306,
            "user": "acaas",
            "password": "acaas",
            "database": "acaas"
        },
        'mq': {
            'url': ''
        }
    }
};

var _config = config[process.env.NODE_ENV] || config['default'];

_config.http.port = process.env.HTTP_PORT || _config.http.port;
_config.mq.url = process.env.MQ_URL || _config.mq.url;
_config.db.host = process.env.DB_HOST || _config.db.host;
_config.db.port = process.env.DB_PORT || _config.db.port;
_config.db.user = process.env.DB_USER || _config.db.user;
_config.db.password = process.env.DB_PASSWORD || _config.db.password;
_config.db.database = process.env.DB_DATABASE || _config.db.database;

module.exports = _config;
