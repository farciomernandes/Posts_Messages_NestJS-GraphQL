import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import User from "src/db/models/user.entity";
import RepoService from "src/repo.service";
import UserInput from "./input/user.input";

@Resolver()
export default class UserResolver {
    constructor(private readonly repoService: RepoService){}

    @Query(() => [User])
    public async getUsers(): Promise <User[]> {
        return this.repoService.userRepo.find();
    }

    @Query(()=> User, {nullable: true})
    public async getUser(@Args('id') id: number): Promise<User>{
        return this.repoService.userRepo.findOne(id);
    }

    @Mutation(() => User)
    public async createOrLoginUser(@Args('data') input: UserInput): Promise<User>{
        let user = await this.repoService.userRepo.findOne({
            where: { email: input.email.toLowerCase().trim() } 
        });
        
        if(!user){
            user = this.repoService.userRepo.create( { email: input.email.toLowerCase().trim()});
            this.repoService.userRepo.save(user);
        }
       
        return user;
    }
}