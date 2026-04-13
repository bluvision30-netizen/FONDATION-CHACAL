// app/realisations/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import RealisationClient from './RealisationClient';

export const dynamic = 'force-dynamic';

export default async function PageRealisation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: realisation } = await supabase
    .from('realisations')
    .select('*')
    .eq('id', id)
    .single();

  if (!realisation) notFound();

  return <RealisationClient realisation={realisation} />;
}