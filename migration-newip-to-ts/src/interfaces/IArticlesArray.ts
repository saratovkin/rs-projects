import IArticle from "./IArticle";
export default interface IAtricleArray {
    status: string;
    totalResults: number;
    articles: IArticle[];
}