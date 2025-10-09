export interface IPosts {
    id: number;
    title: string;
    body: string;
    views: number;
    userId: number;
    tags: ITags[];
    reactions: IReactions;
}

export interface ITags {
    tags: string;
}

export interface IReactions {
    likes: number;
    dislikes: number;
}