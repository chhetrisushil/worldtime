export class Zone {
  name:string;
  city:string;
  offset:number;
  editMode:boolean = true;
  owner:string;
  _id:string;

  constructor() {}

  parse(data:any) {
    //console.log('parse idea', data);
    for (let k in data) {
      //console.log('search for ', k);
      this[k] = data[k]
    }
  }
}
