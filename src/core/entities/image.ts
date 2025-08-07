

export class Image {
    constructor(
      private readonly id_image:number,
      public id_user: number,
      public nm_image: string,
      public nm_stored: string,
      public vl_size_kb: number,
      public readonly dt_created: Date = new Date()
    ) { }

    get id() {
        return this.id_image;
      }
  
  }

