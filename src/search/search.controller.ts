import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly meiliSearchService: SearchService) {}

  @Get('/:query')
  async search(@Query('query') query: string) {
    const indexName = 'QA_POST';
    const results = await this.meiliSearchService.search(indexName, query);
    return { results };
  }
}
