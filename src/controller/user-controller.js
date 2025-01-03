import userService from '../service/user-service.js';

const register = async (req, res, next) => {
  try {
    const response = await userService.register(req.body);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const response = await userService.login(req.body);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export default { register, login };
