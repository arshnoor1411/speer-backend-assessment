// meilisearch.service.ts
import { Injectable } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class SearchService {
  private readonly client: MeiliSearch;

  constructor() {
    this.client = new MeiliSearch({ host: 'http://localhost:7700' }); // Set your MeiliSearch server URL
  }

  async indexDocuments(indexName: string, documents: any[]) {
    console.log(documents);
    console.log(indexName);
    const index = this.client.index(indexName);
    await index.addDocuments(documents);
  }

  async search(indexName: string, query: string) {
    const index = this.client.index(indexName);
    const searchResults = await index.search(query);
    return searchResults.hits;
  }
}
