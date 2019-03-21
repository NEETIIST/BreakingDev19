const AccessControl = require('accesscontrol');

let grantsObject = {

    /*
    admin: {
        video: {
            'create:any': ['*', '!views'],
            'read:any': ['*'],
            'update:any': ['*', '!views'],
            'delete:any': ['*']
        }
    },
    */

    /*
    dev: {
        video: {
            'create:own': ['*', '!rating', '!views'],
            'read:own': ['*'],
            'update:own': ['*', '!rating', '!views'],
            'delete:own': ['*']
        }
    }
    */

    starter: {
        user: {
            'read:own': ['*']
        },
        devProfile: {
            'create:own': ['*']
        }
    },

    dev: {
        devProfile: {
            'update:own': ['*']
        }
    }



};

const ac = new AccessControl(grantsObject);

module.exports = ac;
