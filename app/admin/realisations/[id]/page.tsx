// app/admin/realisations/[id]/page.tsx
import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import RealisationForm from '../RealisationForm';
import { updateRealisation } from '@/lib/actions';
import type { Realisation } from '@/types';

export default async function EditRealisationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: realisation } = await supabaseAdmin.from('realisations').select('*').eq('id', id).single();
  if (!realisation) notFound();

  const save = async (formData: FormData) => {
    'use server';
    await updateRealisation(id, formData);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Modifier la réalisation</h1>
        <p className="text-sm text-gray-500 mt-1">{realisation.titre}</p>
      </div>
      <RealisationForm realisation={realisation as Realisation} onSave={save} />
    </div>
  );
}
