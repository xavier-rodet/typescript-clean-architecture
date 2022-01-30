import { TEither } from 'src/_common/typescript';

export type TApiError<Status> = {
  error: string;
  status: Status;
};

export type TApiContent<Content, Status> = {
  content: Content;
  status: Status;
};

export type TApiResponse<Content, SuccessCode, ErrorCode> = TEither<
  TApiError<ErrorCode>,
  TApiContent<Content, SuccessCode>
>;
