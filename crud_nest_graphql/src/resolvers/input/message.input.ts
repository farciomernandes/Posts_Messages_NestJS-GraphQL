import { Field, InputType } from '@nestjs/graphql';
import UserInput from './user.input';

/**
 * 
 * 
@InputType()
class MessageUserConnectInput { // O que eu preciso para me conectar a mensagem ao usuario ?
    @Field()
    readonly id: number;
}

@InputType()
class MessageUserInput { // O que eu preciso fazer ?
    @Field()
    readonly connect: MessageUserConnectInput; 

    @Field({ nullable: true })
    readonly create: UserInput;
}
 * 
 */
@InputType()
export default class MessageInput { //O que é necessário para criar uma mensagem ?
    @Field()
    readonly content: string;

    @Field()
    userId: number;
}

@InputType()
export class DeleteMessageInput {
  @Field()
  readonly id: number;

  @Field()
  readonly userId: number;
}