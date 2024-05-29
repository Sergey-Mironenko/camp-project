import EmailService from '@/services/email.service';
import JWTService from '@/services/jwt.service';
import UserService from '@/services/user.service';
import { UserType } from '@/types/user.type';
import { Response, Request } from 'express';

export class UserController {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private jwtService: JWTService,
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const checkedUser = await this.userService.getByEmail(email);

    if (checkedUser) {
      res.sendStatus(409).json({ message: 'User with such email already exists'});

      return;
    }

    const user = await this.userService.createUser(name, email, password);

    if (user) {
      await this.emailService.sendEmail(email, user.activationToken as string, 'Activation');
    }

    res.sendStatus(200).json({ message: 'Email has been sent'});
  }

  async activateUser(req: Request, res: Response): Promise<void> {
    const { activationToken } = req.params;

    const user = await this.userService.getByActvationToken(activationToken);

    if (user) {
      res.send(404).json({ message: 'No one to activate'});

      return;
    }

    const activatedUser = await this.userService.activateUser(activationToken);

    const { accessToken } = this.jwtService.sign(activatedUser as UserType);

    res.send({
      user: activatedUser,
      accessToken,
    });
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.params;

    const user = await this.userService.getByEmail(email);

    if (!user) {
      res.send(401).json({ message: 'Wrong email'});

      return;
    }

    if (user.password !== password) {
      res.send(401).json({ message: 'Wrong password'});

      return;
    }

    if (!user.isActivated) {
      res.send(401).json({ message: 'Activate your account firs'});

      return;
    }

    const { accessToken } = this.jwtService.sign(user as UserType);

    res.send({
      user: user,
      accessToken,
    });
  }

  async verifyUser(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    const checkedUser = await this.userService.getByEmail(email);

    if (checkedUser) {
      res.send(404).json({ message: 'No user with such email'});

      return;
    }

    const user = await this.userService.verifyUser(email);

    if (user) {
      await this.emailService.sendEmail(email, user.verificationToken as string, 'Reset password');
    }
       
    res.sendStatus(200).json({ message: 'Email has been sent'});
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { verificationToken } = req.params;
    const { password } = req.body;

    const user = await this.userService.getByVerificationToken(verificationToken);

    if (user) {
      res.send(404).json({ message: 'No one to reset'});

      return;
    }

    const resetedUser = await this.userService.resetPassword(verificationToken, password);
       
    res.send(resetedUser);
  }

  async updateData(req: Request, res: Response): Promise<void> {
    const { id, name, email, password } = req.body;

    const user = await this.userService.updateUser(id, name, email, password);
       
    res.send(user);
  }
}

const userController = new UserController(new UserService(), new EmailService(), new JWTService());
export default userController;
