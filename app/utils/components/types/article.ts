export type Section = {
    title: string,
    text: string,
}

export type Image = {
    file: string,
    title?: string;
    photographer?: string,
    reference?: string,
    alt: string,
}

export type Next = {
    url: string,
    chapter: number,
    title: string,
}

export type Articles = {
    url: string,
    chapter: number,
    title: string,
    image: Image,
    nextUrl: Next | null,
}

export type Article = {
    id: string,
    chapter: number,
    title: string,
    section: Section[],
    image: Image[],
    next?: Next,
    notes: string,
}
