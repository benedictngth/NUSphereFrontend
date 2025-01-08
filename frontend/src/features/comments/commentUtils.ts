export interface Comment {
    ID : string,
    Content : string,
    CreatedAt : string,
    UpdatedAt : string,
    PostID : string,
    UserID : string
}

export type NewComment = Pick<Comment, 'Content' | 'PostID' | 'UserID'>
export type EditComment = Pick<Comment, 'ID' | 'Content'>

