export interface Post{
    id ?: number;
    content : string;
    createdBy: string; 
    profilePicture: string;
    createdAt?: Date; 
}