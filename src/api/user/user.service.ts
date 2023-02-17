import User, { IUser } from '../../data/user.model';


class UserService {
  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email }).exec();
    return user;
  }

  async createUser(user: IUser): Promise<IUser> {
    const createdUser = await User.create(user);
    return createdUser;
  }
}

export default new UserService();
