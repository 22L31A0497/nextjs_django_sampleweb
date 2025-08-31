import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const dynamic = 'force-dynamic';

const AuthCheck = (req: Request): string | false => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'default_secret_dumbSecret'
    ) as JwtPayload;

    return decoded?.role ?? false;
  } catch (error) {
    return false;
  }
};

export default AuthCheck;
