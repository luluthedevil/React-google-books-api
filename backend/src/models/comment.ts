import { dbQuery, dbQueryFirst } from "../services/db";

export type Comment = {
    id: number;
    personName: string;
    personComment: string;
    bookName: string;
}

export const insertComment = async (comment: Comment) => {
    await dbQuery(`INSERT INTO comment (personName, personComment, bookName) VALUES(?, ?, ?)`, [comment.personName, comment.personComment, comment.bookName]);
    let retorno = await dbQuery(`SELECT seq AS id FROM sqlite_sequence WHERE name = 'comment'`);
    return retorno[0].id as number || undefined;
};

const updateComment = async (comment: Comment) => {
    await dbQuery(`UPDATE comment SET name = ?, price = ? WHERE id = ?`, [comment.personName, comment.personComment, comment.bookName, comment.id])
    return getComment(comment.id);
}

const listComments = async () => {
    const retorno = await dbQuery(`SELECT * FROM comment`);
    return retorno as Comment[];
}

const getComment = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM comment WHERE id = ?`, [id]);
    return retorno as Comment | undefined;
}

const deleteComment = async (id: number) => {
    await dbQueryFirst(`DELETE FROM comment WHERE id = ?`, [id]);
}

export const commentModel = {
    insertComment,
    listComments,
    getComment,
    deleteComment,
    updateComment
}