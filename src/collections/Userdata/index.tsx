import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const UserData: CollectionConfig = {
  slug: 'UserData',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['user', 'balance'],
    useAsTitle: 'user',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users', // links to the Users collection
      required: true,
      unique: true, // one user → one userdata
      admin: {
        description: 'The user this data belongs to',
      },
    },
    {
      name: 'balance',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'The amount of money the user has in their account',
      },
    },
    // You can add more user-specific fields here, e.g. subscription status, points, etc.
  ],
  timestamps: true,
}
