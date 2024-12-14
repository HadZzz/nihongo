import { account } from './appwrite';
import { ID } from 'appwrite';

export async function createAccount(email: string, password: string, name: string) {
    try {
        console.log('Creating account for:', { email, name });
        const response = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        console.log('Account created successfully:', response);
        
        // Auto login after registration
        try {
            console.log('Attempting auto-login after registration');
            const session = await account.createEmailSession(email, password);
            console.log('Auto-login successful');
            return response;
        } catch (loginError: any) {
            console.error('Auto-login failed:', loginError);
            return response;
        }
    } catch (error: any) {
        console.error('Detailed registration error:', {
            message: error.message,
            code: error.code,
            type: error.type,
            response: error.response
        });
        throw error;
    }
}

export async function login(email: string, password: string) {
    try {
        console.log('Attempting login with:', { email });
        const session = await account.createEmailSession(email, password);
        console.log('Login successful:', session);
        return session;
    } catch (error: any) {
        console.error('Detailed login error:', {
            message: error.message,
            code: error.code,
            type: error.type,
            response: error.response
        });
        throw error;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}

export async function getCurrentUser() {
    try {
        const user = await account.get();
        return user;
    } catch (error: any) {
        // If error is due to user not being logged in, return null without logging
        if (error.type === 'user_unauthorized' || 
            (error.message && error.message.includes('missing scope'))) {
            return null;
        }
        // Log other types of errors
        console.error('Error getting current user:', error);
        return null;
    }
}
