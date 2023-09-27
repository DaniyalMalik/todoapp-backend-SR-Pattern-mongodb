const jwt = require('jsonwebtoken');

export class AuthenticationService {
  public async authenticate(req: any): Promise<any> {
    let authToken;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      authToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      return false;
    }

    try {
      const verifiedUser = await admin.auth().verifyIdToken(authToken);

      req.userId = verifiedUser.user_id;

      return true;
    } catch (error) {
      return false;
    }
  }

  // public async verifyAuthToken(authToken: string): Promise<any> {
  //   try {
  //     await admin.auth().verifyIdToken(authToken);

  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }
}
