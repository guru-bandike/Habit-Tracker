import CustomError from '../errors/customError.js';

const validateDate = (req, res, next) => {
  const { date: receivedDate } = req.body;

  if (!receivedDate) return next(new CustomError('Date is required!', 400));

  const date = new Date(receivedDate);

  // If received date is Invalid, Send failure response
  if (isNaN(date.getTime())) return next(new CustomError('Invalid date!', 400));

  // Else, Proceed to next middleware
  next();
};

export default validateDate;
