export type Product = {
    id: number,
    category: string,
    description: string,
    image: string,
    rating: {count: number, rate: number},
    title: string,
    price: string
}