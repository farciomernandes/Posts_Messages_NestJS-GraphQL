import { Resolver, Query, Args, Mutation, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import Message from "src/db/models/message.entity";
import User from "src/db/models/user.entity";

import RepoService from "src/repo.service";
import MessageInput, { DeleteMessageInput } from "./input/message.input";

export const pubSub = new PubSub();

@Resolver(() => Message)
export default class MessageResolver {
    constructor(private readonly repoService: RepoService) { }

    @Query(() => [Message])
    public async getMessages(): Promise<Message[]> {
        return this.repoService.messageRepo.find();
    }

    @Query(() => [Message])
    public async getMessagesFromUser(@Args('userId') userId: number): Promise<Message[]> {
        return this.repoService.messageRepo.find({
            where: { userId }
        });
    }

    @Query(() => Message, { nullable: true })
    public async getMessage(@Args('id') id: number): Promise<Message> {
        return this.repoService.messageRepo.findOne(id);
    }

    @Mutation(() => Message)
    public async createMessage(@Args('data') input: MessageInput): Promise<Message> {
        const message = this.repoService.messageRepo.create({
            userId: input.userId,
            content: input.content
        });
        const response = await this.repoService.messageRepo.save(message);

        pubSub.publish('messageAdded', { messageAdded: message });

        return response;
    }

    @Mutation(() => Message)
    public async deleteMessage(
        @Args('data') input: DeleteMessageInput,
    ): Promise<Message> {
        const message = await this.repoService.messageRepo.findOne(input.id);

        if (!message || message.userId !== input.userId)
            throw new Error(
                'Message does not exists or you are not the message author',
            );

        const copy = { ...message };

        await this.repoService.messageRepo.remove(message);

        return copy;
    }
    @Subscription(() => Message)
    messageAdded() {
        return pubSub.asyncIterator('messageAdded');
    }


    @ResolveField(() => User, { name: 'user' }) // Sobrescreve o @Field de usu??rio
    public async getUser(@Parent() parent: Message): Promise<User> {
        return this.repoService.userRepo.findOne(parent.userId);
    }
}