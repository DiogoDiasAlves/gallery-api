export class User {
   
  
    constructor(
      private readonly id_user: Number,
      public nm_name: string,
      public nm_login: string,
      public vl_password: string,
      public vl_salt : string,
      public readonly createdAt: Date = new Date()
    ) {}
  
    get id() {
      return this.id_user;
    }

    changePassword(Newpassword: string, Newsalt: string){
        this.vl_password = Newpassword;
        this.vl_salt = Newsalt;
    }
  }
