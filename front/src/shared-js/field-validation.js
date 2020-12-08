export const require = (value) => {
    if(value) {
        return false
    } else {
        return "field is required"
    }
}

const minLength = (length) => {
    return function(value) {
        if(value.length >= length) {
            return false
        } else {
            return `required at least ${length} tabs`
        }
    }
}

export const minLengthTwo = minLength(2)