export interface CategoryType {
    id : number,
    name : string,
    description : string,
    image : string
}

export interface ProductsType {
    id : number,
    name : string,
    description : string,
    image : string,
    price : number,
    rate : number ,
    categoryId : number
}