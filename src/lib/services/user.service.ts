import { getConvexClient } from '../convex-client';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { ConflictError, NotFoundError } from '../utils/errors';
import { getStripe } from '../stripe';

export class UserService {
  private convex = getConvexClient();

  // Create user with Stripe customer
  async createUser(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    address?: any;
    dob?: string;
    preferences?: any;
  }) {
    // Create Stripe customer
    const stripe = getStripe();
    const customer = await stripe.customers.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address ? {
        line1: data.address.line1,
        line2: data.address.line2,
        city: data.address.city,
        state: data.address.state,
        postal_code: data.address.postal_code,
        country: data.address.country,
      } : undefined,
      metadata: {
        app_user: 'true',
      },
    });

    // Create user in database
    try {
      const userId = await this.convex.mutation(api.users.createUser, {
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        address: data.address,
        dob: data.dob,
        preferences: data.preferences,
        stripeCustomerId: customer.id,
      });

      return userId;
    } catch (error: any) {
      // Clean up Stripe customer if user creation fails
      await stripe.customers.del(customer.id);
      throw error;
    }
  }

  // Verify user credentials
  async verifyCredentials(email: string, password: string) {
    const user = await this.convex.query(api.users.verifyCredentials, {
      email,
      password,
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  // Get user by ID
  async getUser(userId: Id<"users">) {
    const user = await this.convex.query(api.users.getUser, { id: userId });
    
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  // Update user profile
  async updateUser(userId: Id<"users">, updates: {
    name?: string;
    phone?: string;
    avatar?: string;
    address?: any;
    dob?: string;
    preferences?: any;
  }) {
    return await this.convex.mutation(api.users.updateUser, {
      id: userId,
      ...updates,
    });
  }

  // Delete user and associated Stripe customer
  async deleteUser(userId: Id<"users">) {
    const user = await this.getUser(userId);
    
    // Delete Stripe customer if exists
    if (user.stripeCustomerId) {
      const stripe = getStripe();
      try {
        await stripe.customers.del(user.stripeCustomerId);
      } catch (error) {
        console.error('Failed to delete Stripe customer:', error);
        // Continue with user deletion even if Stripe deletion fails
      }
    }

    return await this.convex.mutation(api.users.deleteUser, { id: userId });
  }
}

export const userService = new UserService();
