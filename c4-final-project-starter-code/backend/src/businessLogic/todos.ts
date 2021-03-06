import { TodosAccess } from '../dataLayer/todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { TodoUpdate } from '../models/TodoUpdate'
import * as uuid from 'uuid'

const data = new TodosAccess()
const bucketName = process.env.ATTACHMENT_S3_BUCKET

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    var items = await data.getTodos(userId)
    
    return items.map(i => {
        i.attachmentUrl = `https://${bucketName}.s3.us-east-1.amazonaws.com/${i.todoId}`
        return i;
    })
}

export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {

    const todoId = uuid.v4()

    const newTodo: TodoItem = {
        userId: userId,
        todoId: todoId,
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false
    }

    return await data.createTodo(newTodo)
}

export async function updateTodo(
    userId: string,
    todoId: string,
    updateTodoRequest: UpdateTodoRequest
): Promise<TodoUpdate> {

    const updatedTodo: TodoUpdate = {
        name: updateTodoRequest.name,
        dueDate: updateTodoRequest.dueDate,
        done: updateTodoRequest.done
    }

    return await data.updateTodo(userId, todoId, updatedTodo)
}

export async function deleteTodo(userId: string, todoId: string): Promise<String>  {

    return data.deleteTodo(userId, todoId)
}

export async function todoExists(userId: string, todoId: string) {
    return await data.todoExists(userId, todoId);
}

export async function createAttachmentPresignedUrl(todoId: string) {
    return await data.generateUploadUrl(todoId);
}