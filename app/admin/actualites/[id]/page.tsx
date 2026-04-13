// app/admin/actualites/[id]/page.tsx
import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ActualiteForm from '../ActualiteForm';
import { updateActualite } from '@/lib/actions';
import type { Actualite } from '@/types';

export default async function EditActualitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: actualite } = await supabaseAdmin.from('actualites').select('*').eq('id', id).single();
  if (!actualite) notFound();

  const save = async (formData: FormData) => {
    'use server';
    await updateActualite(id, formData);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Modifier l&apos;actualité</h1>
        <p className="text-sm text-gray-500 mt-1">{actualite.titre}</p>
      </div>
      <ActualiteForm actualite={actualite as Actualite} onSave={save} />
    </div>
  );
}
