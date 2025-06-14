import { auth } from '../auth';
import AdminClient from './AdminClient';

export default async function Page() {
  const session = await auth();
  console.log(JSON.stringify(session))

  return session && session.user?.email === 'huwig.marco@gmail.com' ? <AdminClient /> : <div>Unauthorized</div>;
}