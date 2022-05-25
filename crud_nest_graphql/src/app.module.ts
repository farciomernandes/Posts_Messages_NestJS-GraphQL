import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import * as ormOptions from './config/orm';

import RepoModule from './repo.module';

import UserResolver from './resolvers/user.resolver';
import MessageResolver from './resolvers/message.resolver';

const gqlImports = [
  UserResolver,
  MessageResolver,
]; 

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      installSubscriptionHandlers: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
