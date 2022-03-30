/* eslint-disable no-lone-blocks */
import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Comment, commentModel } from '../models/comment';

const insertComment = (req: Request, res: Response) => {
    {
        const comment = req.body;

        if (!comment)
            return badRequest(res, "Comentário inválido");

        if (!comment.personName)
            return badRequest(res, 'Informe seu nome ');
        
        if (!comment.personComment)
            return badRequest(res, 'Escreva um comentário');

        if (!comment.bookName)
            return badRequest(res, 'Informe o nome do livro ');

    }

    const comment = req.body as Comment;
    
    return commentModel.insertComment(comment)
        .then((comment: any) => {
            res.json(comment);
        })
        .catch((err: Error) => internalServerError(res, err));
}


const updateComment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const comment = req.body;

        if (!comment)
            return badRequest(res, "Comentário inválido");

        if (!comment.personName)
            return badRequest(res, 'Informe seu nome ');
        
        if (!comment.personComment)
            return badRequest(res, 'Escreva um comentário');

        if (!comment.bookName)
            return badRequest(res, 'Informe o nome do livro ');

        const commentSaved = await commentModel.getComment(id);

        if(!commentSaved)
            return notFound(res);
    }

    const comment = req.body as Comment;
    
    return commentModel.updateComment(comment)
        .then((comment: any) => {
            res.json(comment)
        })
        .catch((err: Error) => internalServerError(res, err));
}


const listComments = ({}: Request, res: Response) => {
    commentModel.listComments()
        .then((comment: any) => {
            res.json(comment)
        })
        .catch((err: Error) => internalServerError(res, err));
}

const getComment = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return commentModel.getComment(id)
        .then((comment: any) => {
            if(comment)
                return res.json(comment);
            else
                return notFound(res);
        })
        .catch((err: Error) => internalServerError(res, err));
}

const deleteComment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const commentSaved = await commentModel.getComment(id);
        if(!commentSaved)
            return notFound(res);
    }

    return commentModel.deleteComment(id)
        .then(() => ok(res))
        .catch((err: Error) => internalServerError(res, err));
}

export const commentController = {
    insertComment,
    listComments,
    getComment,
    deleteComment,
    updateComment
};