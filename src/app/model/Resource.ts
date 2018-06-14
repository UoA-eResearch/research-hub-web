export interface Resource {
  id: string,
  name: string,
  accessLevels: AccessLevel[]
}

export interface AccessLevel {
  name: string,
  users: number[]
}

export class Vm implements Resource {
  id;
  name;

  accessLevels = [
    { name: 'Admin',  grouperGroupId: 'vmadmin', users: []},
    { name: 'User Access', grouperGroupId: 'vmuser', users: []}
  ];
}

export class FileShare implements Resource {
  id;
  name;

  accessLevels = [
    { name: 'Read Write', grouperGroupId: 'rw', users: []},
    { name: 'Read Only', grouperGroupId: 'ro', users: []}
  ];
}
