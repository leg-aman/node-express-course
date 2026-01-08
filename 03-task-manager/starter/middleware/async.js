const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try{
            await fn(req, res, next)
        } catch (error) {

        }
    }
}

module.exports = asyncWrapper