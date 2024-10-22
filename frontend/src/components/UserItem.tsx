"use client";
import React from 'react';

type User = {
    email: string;
    provider: string;
    role: {
        type: string;
        name: string;
    };
    documentId: string;
};

type UserItemProps = {
    user: User;
};

export default function UserItem({ user }: UserItemProps) {
    return <li className="p-6 border rounded-lg shadow-md bg-gray-500 mb-4" key={user.documentId}>
        <div className="flex items-center mb-4">
            {/* <img src={user.userAvatar} alt={user.email} className="w-10 h-10 rounded-full mr-4" /> */}
            <div>
                <h2 className="text-lg font-semibold">{user.email}</h2>
                <p className="text-sm text-gray-900">{user.role.name}</p>
            </div>
        </div>
    </li>;
};
