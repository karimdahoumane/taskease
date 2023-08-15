import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const signToken = (id: string) => {
  const payload: JwtPayload = { id };

  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const payload = jwt.verify(token, <Secret>process.env.JWT_KEY);


    if (typeof payload !== 'object') {
      return null;
    }

    return payload as JwtPayload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}