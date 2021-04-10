const EmployeesEditValidationRules = {
    id_department: {
        validations: {
            required: true,
        },
        valid: false,
        label: "Department"
    },
    name: {
        validations: {
            required: true,
            minLength: 2,
            maxLength: 120,
        },
        valid: false,
        label: "Name"
    },
    position: {
        validations: {
            required: true,
            minLength: 2,
            maxLength: 120,
        },
        valid: false,
        label: "Position"
    },
    salary: {
        validations: {
            required: true,
            minLength: 2,
            maxLength: 120,
        },
        valid: false,
        label: "Salary"
    },
    hiring_date: {
        validations: {
            required: true,
            minLength: 6,
            maxLength: 10,
        },
        valid: false,
        label: "Hiring date"
    },
    leaving_date: {
        validations: {
            required: true,
            minLength: 6,
            maxLength: 10,
        },
        valid: false,
        label: "Leaving date"
    },
    status: {
        validations: {
            required: true,
        },
        valid: false,
        label: "Status"
    },
}

export default EmployeesEditValidationRules;