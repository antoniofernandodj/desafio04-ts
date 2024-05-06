import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name || !user.email){
            return response.status(400).json({ message: 'Bad request! Name e email obrigatórios'})
        }

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json( users )
    }

    removeUser = (request: Request, response: Response): Response => {
        const { email } = request.params

        if (!email) {
            return response.status(400).json({ message: 'Bad request! Email obrigatório'})
        }

        this.userService.removeUser(email)
        return response.status(200).json({ message: `Usuário com o email ${email} removido com sucesso.` })
    }

}
