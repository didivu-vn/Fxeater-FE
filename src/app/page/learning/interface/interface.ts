import { IAuthor } from "src/app/shared/interface";

export interface IChartImage {
	id: number;
	imgUrl: string;
	name: string;
	description: string;
}

export interface IChartPattern {
	id: number;
	name: string;
	author_info: IAuthor;
	chart_imgs: IChartImage[];
	category: string;
	description: string;
	slug?: string
}