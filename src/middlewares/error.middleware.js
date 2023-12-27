const errorHandler = (err, req, res, next) => {
    console.error(err);

    res.status(500).send('An internal error occurred');
};

export { errorHandler }