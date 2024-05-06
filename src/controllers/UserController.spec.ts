import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { ParamsDictionary } from "express-serve-static-core";


describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        removeUser: jest.fn(),
    }
    
    const userController = new UserController(mockUserService as UserService);
    const mockGetAllUsers = jest.spyOn(userController, 'getAllUsers')

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = { body: {name: 'Nath',email: 'nath@test.com'} } as Request
        const mockResponse = makeMockResponse()

        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Não deve aceitar usuario sem nome', () => {
        const mockRequest = { body: {email: 'nath@test.com'} } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject(
            { message: 'Bad request! Name e email obrigatórios'}
        )
    })

    it('Requisitar todos os usuarios do banco', () => {
        const mockRequest = { body: {} } as Request
        const mockResponse = makeMockResponse()

        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockGetAllUsers).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(200)
    })

    it('Não deve aceitar usuario sem email', () => {
        const mockRequest = { body: {name: 'Nath'} } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject(
            { message: 'Bad request! Name e email obrigatórios'}
        )
    })

    it('Remover usuario', () => {

        const params: ParamsDictionary = {email: 'nath@test.com'}
        const mockRequest = {params: params} as Request;
        const mockResponse = makeMockResponse()
        userController.removeUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject(
            { message: `Usuário com o email nath@test.com removido com sucesso.` }
        )
    })

})

