import React from 'react';
import UserItem from '../../components/UserItem'; // Assuming you have a UserItem component
import { gql, request } from 'graphql-request';
import { User } from '../../types/User'; // Assuming you have a User type

const STRAPI_GRAPHQL_URL = process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function fetchUsers(): Promise<User[]> {
    const query = gql`
        query UsersPermissionsRoles {
  usersPermissionsRoles {
    users {
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
    const response: { usersPermissionsRoles: { users: User[] }[] } = await request(STRAPI_GRAPHQL_URL, query, {}, headers);
    const users = response.usersPermissionsRoles.flatMap(role => role.users);
    return users;
}

export const fetchCache = 'force-no-store';

export default async function UsersPage() {
    const users = await fetchUsers();

    return (
        <div className="container mx-auto p-4 text-gray-900 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-4">Users</h1>
            <ul className="space-y-4">
            {users.map(user => (
                <UserItem key={user.documentId} user={user} />
            ))}
            </ul>
        </div>
    );
}
