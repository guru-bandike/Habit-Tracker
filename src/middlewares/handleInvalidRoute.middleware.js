const handleInvalidRoute = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found!, Please check out our documentaion for more information!',
  });
};

export default handleInvalidRoute;
