import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from './../../../../../lib/mongodb';
import mongooseConnect from '../../../../../lib/mongoose';
import { User } from '../../../../../models/User';
import { compare } from 'bcrypt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      checks: ['none']
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await mongooseConnect();
          const user = await User.findOne({ email: credentials.email }).select('+password');
          if (user) {
            const isPasswordCorrect = await compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              return user;
            }
            throw new Error("Invalid credentials");
          }
          throw new Error("Invalid credentials");
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw new Error("Server error");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.accessToken = account.access_token;

        try {
          await mongooseConnect();
          // Cari pengguna di database berdasarkan email
          const existingUser = await User.findOne({ email: profile.email });

          const updateData = {
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            googleProvider: true // Indicate that this user was created via Google
          };

          if (!existingUser) {
            updateData.subscriptions = false; // Set default value for new user
          } else {
            // Gabungkan data dari pengguna yang ada
            updateData.subscriptions = existingUser.subscriptions;
            updateData.googleProvider = existingUser.googleProvider || true;
          }

          console.log('Updating/Creating user with data:', updateData);

          // Update the user if exists, otherwise create a new user
          const dbUser = await User.findOneAndUpdate(
            { email: profile.email },
            { $set: updateData },
            { new: true, upsert: true, setDefaultsOnInsert: true }
          );

          console.log('User after update/create:', dbUser);

          token.id = dbUser._id;
          token.subscriptions = dbUser.subscriptions;
        } catch (error) {
          console.error('Error in JWT callback:', error);
          throw new Error("Server error");
        }
      } else if (user) {
        token.id = user._id;
        token.subscriptions = user.subscriptions; // Add subscriptions to the token for manual login
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user._id = token.id;
      session.user.subscriptions = token.subscriptions;
      return session;
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
