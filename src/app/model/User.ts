
export class User {

  public firstName: string;
  public lastName: string;
  public displayName: string;
  public eppn: string;
  public mail: string;
  public uid: string;
  public initials: string;

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
    user.firstName = User.getAttrValue(attributes, 'givenName');
    user.lastName = User.getAttrValue(attributes, 'sn');

    // Create Initials for user
    if (user.firstName.length > 0 && user.lastName.length > 0) {
      user.initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
    } else {
      user.initials = 'Me';
    }

    return user;
  }
}
