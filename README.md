# Strapi Client Library

A lightweight, fetch-based client for interacting with Strapi v4+ APIs, designed for both server-side and client-side usage.

## Features

- TypeScript support
- Simple API mirroring Strapi's REST endpoints
- Automatic error handling
- Query parameter serialization
- Works in Node.js, Next.js server components, and browsers

## Usage

### Initialization

```typescript
import { StrapiClient } from '@your-username/strapi-client';

const strapi = new StrapiClient({
  baseURL: 'https://your-strapi-instance.com/api',
  token: 'your-api-token',
});
```

### Basic CRUD Operations

#### Get multiple entries

```typescript
// Get all articles with filters
const articles = await strapi.getEntries('articles', {
  filters: { published: { $eq: true } },
  populate: ['author', 'cover'],
  sort: ['publishedAt:desc'],
  pagination: { page: 1, pageSize: 10 }
});
```

#### Get single entry

```typescript
const article = await strapi.getEntry('articles', 123);
```

#### Create entry

```typescript
const newArticle = await strapi.createEntry('articles', {
  title: 'New Post',
  content: 'Lorem ipsum...',
  published: true
});
```

#### Update entry

```typescript
const updatedArticle = await strapi.updateEntry('articles', 123, {
  title: 'Updated Title'
});
```

#### Delete entry

```typescript
await strapi.deleteEntry('articles', 123);
```

## API Reference

### Constructor

`new StrapiClient(options: StrapiClientOptions)`

**Options:**
- `baseURL`: string - Your Strapi instance base URL (include `/api`)
- `token`: string - API token

### Methods

All methods return a Promise resolving to the Strapi response data.

#### `getEntries(collection: string, params?: any)`
- `collection`: Content-type name (plural)
- `params`: Query parameters (filters, populate, etc.)

#### `getEntry(collection: string, id: number)`
- `collection`: Content-type name (plural)
- `id`: Entry ID

#### `createEntry(collection: string, data: any, params?: any)`
- `collection`: Content-type name (plural)
- `data`: Entry data
- `params`: Additional query parameters

#### `updateEntry(collection: string, id: number, data: any)`
- `collection`: Content-type name (plural)
- `id`: Entry ID
- `data`: Partial update data

#### `deleteEntry(collection: string, id: number)`
- `collection`: Content-type name (plural)
- `id`: Entry ID to delete

## Error Handling

The client throws errors for:
- Network failures
- HTTP errors (non-2xx responses)
- Invalid responses

Catch errors with try/catch:

```typescript
try {
  const data = await strapi.getEntry('articles', 123);
} catch (error) {
  console.error('API error:', error);
}
```

## License

MIT