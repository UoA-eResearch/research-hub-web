

// TODO: Merge with Person
export class User {
  public displayName: string;
  public eppn: string;
  public mail: string;
  public uid: string;

  private static getAttrValue(attributes: any, key: string) {
    for (const attr of attributes) {
      if (attr['name'] === key) {
        const values = attr['values'];
        if (values && values.length) {
          return values[0];
        }
      }
    }

    return '';
  }

  public static fromSession(session: any): User {
    const user = new User();
    const attributes = session['attributes'];
    user.displayName = User.getAttrValue(attributes, 'displayName');
    user.eppn = User.getAttrValue(attributes, 'eppn');
    user.mail = User.getAttrValue(attributes, 'mail');
    user.uid = User.getAttrValue(attributes, 'uid');

    return user;
  }
}
