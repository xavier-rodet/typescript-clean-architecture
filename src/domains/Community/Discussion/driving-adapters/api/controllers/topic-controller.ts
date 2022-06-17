import { EHttpStatus } from '@ts-extension/constants';

import { CreateTopic } from '@domains/Community/Discussion/core/app/use-cases/create-topic';

import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import {
  TopicPresenter,
  TopicPresenterOutput,
} from '../presenters/topic-presenter';

export type PostTopicControllerInput = {
  gameId?: string;
  title: string;
};

export type PostTopicControllerOutput = TopicPresenterOutput;

@Route('')
@Tags('topic')
export class TopicController extends Controller {
  public constructor(
    private useCase: CreateTopic,
    private presenter: TopicPresenter
  ) {
    super();
  }

  @Post('topic')
  @SuccessResponse(EHttpStatus.SuccessCreated, 'Created')
  public async postTopic(
    @Body() request: PostTopicControllerInput
  ): Promise<PostTopicControllerOutput> {
    const useCaseInput = {
      gameId: request.gameId,
      title: request.title,
    };
    const useCaseOutput = await this.useCase.execute(useCaseInput);

    const presenterInput = {
      topic: useCaseOutput.topic,
    };
    return this.presenter.present(presenterInput);
  }
}
