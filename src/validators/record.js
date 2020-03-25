class RecordValidator {
  validate(record) {
    let error;

    if(!record.productId) {
      error = {
        success: 'false',
        message: 'productId is required'
      };
    } else if(!record.quantity) {
      error = {
        success: 'false',
        message: 'quantity is required'
      };
    } else if(!record.price) {
      error = {
        success: 'false',
        message: 'price is required'
      };
    }

    if (error)
      return { isValid: false, error };

    return { isValid: true };
  }
}

export default RecordValidator;
