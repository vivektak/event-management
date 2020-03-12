export const checkMobileValidation = (mobile) => {
    const mobileRegex = "^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$";
    if (mobile.trim() === "") {
        return "Mobile is Required";
    } else if (mobile.match(mobileRegex) === null) {
        return "Invalid Mobile Number"
    }
    else {
        return null;
    }
};


export const checkEventTypeValidation = (eventType) => {
    if (eventType === '') {
        return 'Event type is Required';
    } else {
        return null;
    }
}

export const checkEventLocationValidation = (eventLocation) => {
    if (eventLocation === '') {
        return 'Event location is Required';
    } else {
        return null;
    }
}

export const checkGenderValidation = (gender) => {
    if (gender === '') {
        return 'Gender is Required';
    } else {
        return null;
    }
}

