import { PubSub } from "graphql-subscriptions";
import Message from "src/db/models/message.entity";
import User from "src/db/models/user.entity";
import RepoService from "src/repo.service";
import MessageInput, { DeleteMessageInput } from "./input/message.input";
export declare const pubSub: PubSub;
export default class MessageResolver {
    private readonly repoService;
    constructor(repoService: RepoService);
    getMessages(): Promise<Message[]>;
    getMessagesFromUser(userId: number): Promise<Message[]>;
    getMessage(id: number): Promise<Message>;
    createMessage(input: MessageInput): Promise<Message>;
    deleteMessage(input: DeleteMessageInput): Promise<Message>;
    messageAdded(): AsyncIterator<unknown, any, undefined>;
    getUser(parent: Message): Promise<User>;
}
