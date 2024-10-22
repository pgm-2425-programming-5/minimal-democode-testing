import React from 'react';
import UserItem from '@/components/UserItem'; // Assuming you have a UserItem component
import { gql, request } from 'graphql-request';
import { User } from '@/types/User'; // Assuming you have a User type
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const STRAPI_GRAPHQL_URL = process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function fetchUserById(id: string): Promise<User> {
  // TODO: Fix this
  const filters = {
    documentId: {
      eq: id,
    },
  };
  const query = gql`
    query UsersPermissionsRoles($filters: UsersPermissionsUserFiltersInput) {
      usersPermissionsRoles {
        users(filters: $filters) {
          email
          provider
          role {
            type
            name
            documentId
          }
        }
      }
    }
  `;
  const headers = {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};
  const response: { usersPermissionsUser: { data: User } } = await request(STRAPI_GRAPHQL_URL, query, { id }, headers);
  return response.usersPermissionsUser.data;
}

export const fetchCache = 'force-no-store';

interface UsersPageProps {
  params: {
    id: string;
  };
}

export default async function UsersPage({ params }: UsersPageProps) {
  const user = await fetchUserById(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <UserItem key={user.id} user={user} />
    </div>
  );
}
