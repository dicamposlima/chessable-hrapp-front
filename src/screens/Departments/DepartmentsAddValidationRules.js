const DepartmentsAddValidationRules = {
    name: {
        validations: {
            required: true,
            maxLength: 255,
        },
        valid: false,
        label: "Name"
    },
    description: {
        validations: {
            required: true,
            minLength: 2,
        },
        valid: false,
        label: "Description"
    },
}

export default DepartmentsAddValidationRules;