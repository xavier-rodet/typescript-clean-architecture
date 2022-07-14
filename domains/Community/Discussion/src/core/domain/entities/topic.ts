import { ValidationError } from '@domains/SharedKernel/core/domain/errors';
import { Uid } from '@domains/SharedKernel/core/domain/value-objects';
import { UidUtil } from '@ts-extension/utils';

type TopicProps = {
  id?: Uid;
  gameId?: Uid;
  authorId: Uid;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Topic {
  public id: Uid;
  public gameId?: Uid;
  public authorId: Uid;
  public title: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: TopicProps) {
    this.id = props.id ?? new Uid(UidUtil.generate());
    this.gameId = props.gameId;
    this.authorId = props.authorId;
    this.title = props.title;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();

    this.validate();
  }

  private validate() {
    if (this.title.length >= 50) {
      throw new ValidationError('Topic title is too long');
    }
  }
}
