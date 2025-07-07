# Strapi REST Client

A lightweight Axios-based client for interacting with Strapi v4+ REST API. Simplifies common CRUD operations with TypeScript support.

## Features

- ✅ Full TypeScript support
- ✅ Handles authentication out of the box
- ✅ Proper parameter serialization with `qs`
- ✅ Simple, intuitive API for CRUD operations
- ✅ Works with both Strapi v4 and v5

## Usage

### Basic Setup

```typescript
import { StrapiClient } from 'strapi-rest-client';

const client = new StrapiClient({
  baseURL: 'https://your-strapi-instance.com/api',
  token: 'your-api-token-here'
});
```

### API Methods

#### Get Multiple Entries
```typescript
// Get all published articles
const articles = await client.getEntries('articles');

// With parameters
const filteredArticles = await client.getEntries('articles', {
  filters: { title: { $contains: 'Strapi' } },
  populate: '*',
  sort: 'createdAt:desc'
});
```

#### Get Single Entry
```typescript
const article = await client.getEntry('articles', 1);
```

#### Create Entry
```typescript
const newArticle = await client.createEntry('articles', {
  title: 'New Post',
  content: 'Lorem ipsum...'
});
```

#### Update Entry
```typescript
const updatedArticle = await client.updateEntry('articles', 1, {
  title: 'Updated Title'
});
```

#### Delete Entry
```typescript
await client.deleteEntry('articles', 1);
```

## License

MIT © Evgeni Ivanov