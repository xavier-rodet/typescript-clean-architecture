import { EHttpStatus } from '@ts-extension/http'

import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa'

import { ApiErrorResponse } from '@app/interfaces/api'

import { TopicDto } from '../../entities/topic'
import {
  ApiPostTopicControllerInput,
  ApiPostTopicController,
} from '../../interfaces/api/controllers/post-topic-controller'
import { TOPIC_RESOURCE } from '../../interfaces/api/resources'
// import { isApiErrorResponse } from '@app/interfaces/api/response'

@Route('')
@Tags(TOPIC_RESOURCE)
export class PostTopicController extends Controller {
  constructor(private apiPostTopicController: ApiPostTopicController) {
    super()
  }

  @Post(TOPIC_RESOURCE)
  @SuccessResponse(EHttpStatus.SuccessCreated, 'Created')
  public async postGame(
    @Body() request: ApiPostTopicControllerInput
    // @Res()
    // forbiddenResponse: TsoaResponse<
    //   EHttpStatus.ClientErrorForbidden,
    //   ApiErrorResponse
    // >
  ): Promise<TopicDto | ApiErrorResponse> {
    const response = await this.apiPostTopicController.execute(request)

    this.setStatus(response.status)
    return response.data

    // // TODO: type guard to check if ApiErrorResponse then return forbiddenResponse etc...
    // if (isApiErrorResponse<ApiPostConctrollerOutput>(response)) {
    //   // return forbiddenResponse(response.status, {
    //   //     response.data,
    //   // })
    // } else {
    //   return response.data
    // }

    // const either = await this.controller.postGame({
    //   authentication: { role: ERole.PUBLISHER },
    //   params: game,
    // })
    // const { status } = either.left ?? either.right
    // this.setStatus(status)

    // if (either.left) {
    //   const { status, error } = either.left

    //   switch (status) {
    //     case EHttpStatus.ClientErrorForbidden:
    //       return forbiddenResponse(status, {
    //         error,
    //       })
    //   }
    // }

    // return either.right.content
  }
}
