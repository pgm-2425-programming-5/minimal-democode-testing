// In-memory user store (for demonstration purposes)
export type User = {
  id: number;
  name: string;
  email: string;
  role: {

    type: string;

    name: string;

  }; // This matches the GraphQL response
  provider: string;
  documentId: string;
}