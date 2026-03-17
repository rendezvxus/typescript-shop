export type apiData = {
    title: string,
    description: string,
    price: number,
    images: string[],
    category: category,
}

export type itemData = {
    title: string,
    description: string,
    price: number,
    image: string,
    category: category,
    amount: number
}

export type category = {
    slug: String;
    name: String;
    url: String;
}
