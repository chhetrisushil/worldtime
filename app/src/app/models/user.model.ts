export class User {
  token: string;
  username: string;
  _id: string;
  role: number;
  zones: any;

  parse(data:any) {
    //console.log('parse idea', data);
    for (let k in data) {
      //console.log('search for ', k);
      this[k] = data[k]
    }
  }
}
