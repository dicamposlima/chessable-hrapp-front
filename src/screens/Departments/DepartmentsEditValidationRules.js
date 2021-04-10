const DepartmentsEditValidationRules = {
    name: {
        validations: {
            required: true,
            minLength: 2,
            maxLength: 120,
        },
        valid: false,
        label: "Name"
    },
    description: {
        validations: {
            required: true,
            minLength: 2,
            maxLength: 120,
        },
        valid: false,
        label: "Description"
    },
}

export default DepartmentsEditValidationRules;