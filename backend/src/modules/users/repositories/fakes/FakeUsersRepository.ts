import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);
    return user;
  }
  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(finduser => finduser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
  public async findAllProviders({
    except_user_id,
  }: IFindAllProviderDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(users => users.id !== except_user_id);
    }
    return users;
  }
}
export default FakeUsersRepository;
