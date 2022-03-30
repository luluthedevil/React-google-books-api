import { Router } from 'express';
import { commentController } from '../controllers/comment';

const commentRouter = Router();
commentRouter.get('/', commentController.listComments);
commentRouter.get('/:id', commentController.getComment);
commentRouter.post('/', commentController.insertComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);

export { 
    commentRouter,
}