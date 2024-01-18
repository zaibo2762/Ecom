export class User{
    name!:string
    password!:string
    uploadPhoto!:string
    role!:string
    mobNumber!:string
    address!:Address
    gender!:string
    language!:string
    email!:string
    dob!:string
    agreetc!:boolean
    age!:number
    aboutyou!:string
}
export class Address{
    id!:number
    addLine1!:string
    addLine2!:string
    city!:string
    state!:string
    zipcode!:number
}

export class Product{
     id!:number
     name!:string
     description!:string
     price!:number
     category!:number
}
export class Order{
     id!:number
     userId!:number
     sellerId!:number
     product!:Product
     deliverAdd!:Address
     contact!:number
     dateTime!:string
}