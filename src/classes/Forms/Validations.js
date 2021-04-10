class FormValidation {
    _valid = false;

    constructor(fields) {
        this._fields = fields;
        this._valid = false
        this._errorMessages = []
    }

    get valid() {
        return this._valid
    }

    set valid(valid) {
        this._valid = valid;
    }

    get errorMessages() {
        return this._errorMessages
    }

    formatMessage(message, field, ruleValue) {
        message = message.replace("{field}", field)
        message = message.replace("{minLength}", ruleValue)
        message = message.replace("{maxLength}", ruleValue)
        message = message.replace("{moreThan}", ruleValue)
        message = message.replace("{lessThan}", ruleValue)
        message = message.replace("{isEqualTo}", ruleValue)
        return message
    }

    ValidForm() {
        this._valid = true
        for (let formData in this._fields) {
            if (!this._fields[formData].valid) {
                this._valid = false
                break
            }
        }
    }

    validField(value, field) {
        return this.fieldValidations(value, field)
            .ValidForm()
    }

    fieldValidations(value, field) {
        this._errorMessages[field] = null
        if (this._fields.hasOwnProperty(field)) {
            let rules = this._fields[field]
            let label = this._fields[field].label
            this._valid = true;
            if (rules.validations) {
                for (let rule in rules.validations) {
                    if (typeof this[rule] === "function") {
                        if (!this._valid) {
                            break
                        }
                        this[rule](value, rules, field, label)
                    }
                }
            }
            this._fields[field].valid = this._valid
        }
        return this
    }

    required(value, rules, field, label) {
        let valid = value !== '' && this._valid;
        if (!valid) {
            this._valid = false
            this._errorMessages[field] = this.formatMessage('{field} é obrigatório.', label)
        }
    }

    minLength(value, rules, field, label) {
        if(value){
            let valid = value.length >= rules.validations.minLength && this._valid
            if (!valid) {
                this._valid = false
                this._errorMessages[field] = this.formatMessage("{field} precisa de no mínimo {minLength} caracteres.", label, rules.validations.minLength)
            }
        }
    }

    maxLength(value, rules, field, label) {
        if(value){
            let valid = value.length <= rules.validations.maxLength && this._valid
            if (!valid) {
                this._valid = false
                this._errorMessages[field] = this.formatMessage("{field} aceita no máximo {maxLength} caracteres.", label, rules.validations.maxLength)
            }
        }
    }

    isEmail(value, rules, field, label) {
        if(value){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            let valid = pattern.test(value) && this._valid
            if (!valid) {
                this._valid = false
                this._errorMessages[field] = this.formatMessage("{field} está inválido.", label)
            }
        }
    }

    isNumeric(value, rules, field, label) {
        if(value){
            const pattern = /^\d+$/;
            let valid = pattern.test(value) && this._valid
            if (!valid) {
                this._valid = false
                this._errorMessages[field] = this.formatMessage("{field} deve ser numérico.", label)
            }
        }
    }

    isString(value, rules, field, label) {
        if(value){
            const pattern = /[a-zA-Z\s]+$/;
            let valid = pattern.test(value) && this._valid
            if (!valid) {
                this._valid = false
                this._errorMessages[field] = this.formatMessage("{field} não pode conter números.", label)
            }
        }
    }

    moreThan(value, rules, field, label) {
        if(value){
            let valid = value >= rules.validations.moreThan && this._valid
            if (!valid) {
                this._valid = false
                this._errorMessages[field] = this.formatMessage("{field} precisa ser maior do que {moreThan}.", label, rules.validations.moreThan)
            }
        }
    }

    lessThan(value, rules, field, label) {
        if(value){
            let valid = value <= rules.validations.lessThan && this._valid
            if (!valid) {
                this._valid = false
                this._errorMessages[field] = this.formatMessage("{field} precisa ser menor do que {lessThan}.", label, rules.validations.lessThan)
            }
        }
    }

    isEqualTo(value, rules, field, label) {
        if(value){
            let equal_field = document.getElementById(rules.validations.isEqualTo)
            if (equal_field.value) {
                let valid = value === equal_field.value && this._valid
                if (!valid) {
                    this._valid = false
                    this._errorMessages[field] = this.formatMessage("{field} não é igual a {isEqualTo}.", label, rules.validations.isEqualTo)
                }
            }
        }
    }

}

export default FormValidation