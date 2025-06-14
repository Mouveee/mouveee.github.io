import { auth } from '../auth';
import AdminClient from './AdminClient';

export default async function Page() {
  const session = await auth();

  return session && session.user?.email === 'huwig.marco@gmail.com' ? <AdminClient session={session} /> : null;
}