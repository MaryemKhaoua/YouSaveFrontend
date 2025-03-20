export interface Comment {
    id?: number;
    postId: number;
    comment: string;
    createdBy: string;
    createdAt: Date;
}