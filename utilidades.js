'use strict';

const Utilidades = (function () {
    return {
        obtenerErrores: err => {
            let errors = [];
            if (err.name === 'ValidationError') {
                for (let field in err.errors) {
                    errors.push(err.errors[field].message)
                }
            }
            if (errors.empty) {
                errors = err;
            }

            return errors;
        }
    }
}());

module.exports = Utilidades;
