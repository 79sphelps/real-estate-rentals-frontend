export const FormError = (props) => {
    return (
      <div
        style={{
          color: "red",
          paddingTop: "5px",
          paddingBottom: "15px",
        }}
      >
        {props.msg}
      </div>
    )
  }

export const formErrors = {
    "address": {
        required: true,
        error: "Address must be more than 15 characters to be valid."
    },
    "city": {
        required: true,
        error: "City must be more than 1 character to be valid."
    },
    "state": {
        required: true,
        error: "State code must be 2 characters to be valid."
    },
    "zip": {
        required: true,
        error: "Zip code not valid."
    },
    "price": {
        required: true,
        error: "Price is not valid."
    },
    "beds": {
        required: true,
        error: "Beds must be of form '4' or '4.1'"
    },
    "baths": {
        required: true,
        error: "Baths must be of form '4' or '4.1'"
    },
    "sqft": {
        required: true,
        error: "Square footage must be of form '3000' or '3,450'"
    },
    "description": {
        required: true,
        error: "Please enter a description of at least 25 characters in length."
    }
  }

export const getFormErrorObject = (name, value, formErrorObjectRef) => {
    let formErrorObject = { ...formErrorObjectRef };
    const status = validateInput(name, value);
    return { ...formErrorObject, [name + 'Error']: status };
}

export const getErrorElement = (name, value) => {
    const status = validateInput(name, value);
    return status ? <FormError msg={formErrors[name].error} /> : null;
}

export const validateInput = (name, value) => {
    switch (name) {
      case "address":
        return value.length < 15 ? true : false;
      case "city":
        return value.length < 1 ? true : false;

      case "state":
        return value.length !== 2 ? true : false;

      case "zip":
        let pattern = /^\d{5}(?:[-\s]\d{4})?$/;
        return !pattern.test(value) ? true : false;

      case "price":
        let pricePattern = /^\$\d+(?:[.,]\d+)*$/;
        return !pricePattern.test(value) ? true : false;

      case "beds":
        let bedPattern = /^\d{1}(?:.\d{1})*$/;
        return !bedPattern.test(value) ? true : false;

      case "baths":
        let bathPattern = /^\d{1}(?:.\d{1})*$/;
        return !bathPattern.test(value) ? true : false;

      case "sqft":
        let sqftPattern = /^\d{1,3}(,\d{3})*(\.\d+)?$/;
        return !sqftPattern.test(value) ? true : false;
  
      case "description":
        return value.length < 25 ? true : false;

      default:
        break;
    }
  };