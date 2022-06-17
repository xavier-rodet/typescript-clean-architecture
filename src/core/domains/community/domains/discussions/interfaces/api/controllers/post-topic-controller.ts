import { EHttpStatus } from '@ts-extension/http'

import { AApiController, ApiResponse } from '@app/interfaces/api'

import { TopicDto } from '../../../entities/topic'
import {
  CreateTopic,
  CreateTopicInput,
} from '../../../use-cases/interactors/create-topic'
import { TopicPresenter } from '../presenters/topic-presenter'

export type ApiPostTopicControllerInput = {
  categoryId: string
  title: string
}

export type ApiPostTopicControllerOutput = ApiResponse<TopicDto>

export class ApiPostTopicController extends AApiController {
  constructor(
    private interactor: CreateTopic,
    private presenter: TopicPresenter
  ) {
    super()
  }

  public execute(
    params: ApiPostTopicControllerInput
  ): Promise<ApiPostTopicControllerOutput> {
    const presenter = this.presenter

    const interactorInput: CreateTopicInput = {
      ...params,
    }

    return this.interactor
      .execute(interactorInput, presenter)
      .then(() => {
        return {
          status: EHttpStatus.SuccessCreated,
          data: presenter.getResponse().topic,
        }
      })
      .catch((error) => {
        return this.getErrorResponse(error)
      })
  }
}
