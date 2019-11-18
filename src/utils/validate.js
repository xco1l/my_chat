export default ({ values, errors }) => {
    const rules = {

        email: (value) => {
            if (!value || value === undefined) {

                errors.email = 'E-Mail is required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ) {
                errors.email = 'Invalid E-Mail address';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Password is required';
            } else if (
                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)
            ) {
                errors.password = 'Too easy password';
            }
        },
        repeatPassword: (value) => {
            if (!value) {
                errors.repeatPassword = 'Repeat password';
            } else if (
                values.password !== values.repeatPassword
            ) {
                errors.password = errors.repeatPassword = "Passwords don't match"
            }
        },
        fullname: (value) => {
            if (!value) {
                errors.fullname = 'Name is required';
            }
        }
    }

    for (let key in rules) {
        rules[key](values[key])
    }
}

