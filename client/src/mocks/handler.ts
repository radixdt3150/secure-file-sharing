import { http as rest, RequestHandler, HttpResponse } from 'msw'

import { loginPayload } from './http-payload'
import { CustomHttpResponse, IAuthUser } from '@/types'

type RequestParamsType = {}
type RequestBodyType = {
    email: string,
    password: string
}
export const handlers: RequestHandler[] = [
    rest.post<RequestParamsType, RequestBodyType, CustomHttpResponse<IAuthUser>>('/login', async () => {
        const mockedLoginResponse = {
            status: 200,
            error: false,
            data: loginPayload
        }
        
        return HttpResponse.json(mockedLoginResponse)
    }),
]
