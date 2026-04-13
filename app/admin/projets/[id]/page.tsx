// app/admin/projets/[id]/page.tsx — Édition d'un projet

import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProjetForm from '../ProjetForm';
import { updateProjet } from '@/lib/actions';
import type { Projet } from '@/types';

export default async function EditProjetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: projet } = await supabaseAdmin.from('projets').select('*').eq('id', id).single();
  if (!projet) notFound();

  const save = async (formData: FormData) => {
    'use server';
    await updateProjet(id, formData);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Modifier le projet</h1>
        <p className="text-sm text-gray-500 mt-1">{projet.titre}</p>
      </div>
      <ProjetForm projet={projet as Projet} onSave={save} />
    </div>
  );
}
