import { Controller } from "./Controller";
import { AuthService } from "../api/AuthService";
import { sign } from "jsonwebtoken";
import { createHmac } from "crypto";

export class AuthController extends Controller {
  private authService: AuthService;

  constructor(authService: AuthService) {
    super();
    this.authService = authService;
    console.log("Initializing AuthController");
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = createHmac("sha256", password)
      .update("I love cupcakes")
      .digest("hex");
    return hash;
  }

  async login(login: string, password: string) {
    const user = await this.authService.getUser(login);
    if (!user.success)
      return { message: "User does not exist!", token: undefined };

    const hashedPassword = await this.hashPassword(password);
    if (user.result.pass === hashedPassword) {
      const token = sign(
        {
          data: login,
        },
        String(process.env.JWTSECRET),
        { expiresIn: "24h" }
      );
      return { message: "Success!", token };
    }
    return { message: "Incorrect password!", token: undefined };
  }

  async register(login: string, password: string, name: string, about: string) {
    const existedUser = await this.authService.getUser(login);
    if (existedUser.success)
      return { message: "User already exists!", token: undefined };

    const user = await this.authService.createUser({
      name,
      description: about,
      email: login,
      pass: password,
    });

    if (!user.success)
      return { message: "User not created!", token: undefined };

    const token = sign(
      {
        data: login,
      },
      String(process.env.JWTSECRET),
      { expiresIn: "24h" }
    );
    return { message: "Success!", token };
  }
}
