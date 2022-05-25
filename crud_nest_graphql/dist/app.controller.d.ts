import RepoService from './repo.service';
export declare class AppController {
    private readonly reportService;
    constructor(reportService: RepoService);
    getHello(): Promise<string>;
}
