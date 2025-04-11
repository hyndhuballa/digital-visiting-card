import { UserProfile } from '@/components/auth/user-profile';
import { ProtectedRoute } from '@/components/auth/protected-route';

export function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <UserProfile />
      </div>
    </ProtectedRoute>
  );
} 