import { redirect } from 'next/navigation';
import Studio from './studio';
import { getUser } from '@/lib/supabase/server';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getUser();if(!user)redirect('/login');return <Studio user={user.user_metadata?.full_name??user.email??''}/>;}
