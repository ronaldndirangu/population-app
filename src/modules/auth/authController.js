import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import Utils from '../../helpers/utils';

class AuthController {
  static async signUpUser(req, res) {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        ...req.body,
        password: hashedPassword,
      });
      const token = Utils.generateToken({ id: user.id, email, name });
      user.save();

      res.status(201).json({
        message: 'User signed up successfully!',
        token,
        user
      });
    } catch (error) {
      throw error;
    }
  }

  static async signInUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          message: 'Wrong email or password provided!',
        });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).json({
          message: 'Wrong email or password provided!',
        });
      }
      const token = Utils.generateToken({ id: user.id, email });
      res.status(200).send({
        message: 'User signed in successfully!',
        token,
        user
      });
    } catch (error) {
      throw error;
    }
  }
}

export default AuthController;
