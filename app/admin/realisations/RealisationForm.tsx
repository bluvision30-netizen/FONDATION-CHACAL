'use client';
// app/admin/realisations/RealisationForm.tsx

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Realisation } from '@/types';

type Props = {
  realisation?: Realisation;
  onSave: (formData: FormData) => Promise<void>;
};

export default function RealisationForm({ realisation, onSave }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(realisation?.image_url || '');
  const [statsFr, setStatsFr] = useState<{label:string;valeur:string}[]>(realisation?.stats || []);
  const [statsEn, setStatsEn] = useState<{label:string;valeur:string}[]>(realisation?.stats_en || []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('stats', JSON.stringify(statsFr.filter(s => s.label)));
    formData.set('stats_en', JSON.stringify(statsEn.filter(s => s.label)));
    if (realisation) formData.set('image_url_existing', realisation.image_url);

    setError('');
    startTransition(async () => {
      try {
        await onSave(formData);
        router.push('/admin/realisations');
        router.refresh();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      {/* Image */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Image & Ordre</h3>
        <div className="flex items-start gap-6">
          {imagePreview && (
            <div className="relative w-40 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
              <Image src={imagePreview} alt="Aperçu" fill className="object-cover" unoptimized />
            </div>
          )}
          <div className="flex-1 space-y-3">
            <input type="file" name="image" accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) setImagePreview(URL.createObjectURL(f)); }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Ordre d'affichage</label>
              <input type="number" name="ordre" defaultValue={realisation?.ordre ?? 0} className="input-field w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu bilingue */}
      <div className="grid grid-cols-2 gap-6">
        {/* FRANÇAIS */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-lg">🇫🇷</span>
            <h3 className="text-sm font-medium text-gray-900">Contenu Français</h3>
          </div>
          <Field label="Titre" name="titre" defaultValue={realisation?.titre} required />
          <Field label="Date" name="date_fr" defaultValue={realisation?.date_fr} placeholder="ex: Janvier 2025" required />
          <Field label="Lieu" name="lieu" defaultValue={realisation?.lieu} required />
          <Field label="Bénéficiaires" name="beneficiaires" defaultValue={realisation?.beneficiaires} placeholder="ex: 320 seniors" />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
            <textarea name="description" rows={5} defaultValue={realisation?.description} required
              className="input-field resize-none" />
          </div>
          <StatsEditor label="Statistiques" stats={statsFr} onChange={setStatsFr} />
        </div>

        {/* ANGLAIS */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-lg">🇬🇧</span>
            <h3 className="text-sm font-medium text-gray-900">English Content</h3>
          </div>
          <Field label="Title" name="titre_en" defaultValue={realisation?.titre_en} required />
          <Field label="Date" name="date_en" defaultValue={realisation?.date_en} placeholder="e.g. January 2025" required />
          <Field label="Location" name="lieu_en" defaultValue={realisation?.lieu_en} required />
          <Field label="Beneficiaries" name="beneficiaires_en" defaultValue={realisation?.beneficiaires_en} placeholder="e.g. 320 seniors" />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
            <textarea name="description_en" rows={5} defaultValue={realisation?.description_en} required
              className="input-field resize-none" />
          </div>
          <StatsEditor label="Statistics" stats={statsEn} onChange={setStatsEn} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()}
          className="px-5 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
          Annuler
        </button>
        <button type="submit" disabled={isPending}
          className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-60 transition-colors">
          {isPending ? 'Enregistrement...' : realisation ? 'Mettre à jour' : 'Créer la réalisation'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, defaultValue, required, placeholder }: {
  label: string; name: string; defaultValue?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
      <input type="text" name={name} defaultValue={defaultValue} required={required}
        placeholder={placeholder} className="input-field" />
    </div>
  );
}

function StatsEditor({ label, stats, onChange }: {
  label: string;
  stats: {label:string;valeur:string}[];
  onChange: (v: {label:string;valeur:string}[]) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <button type="button" onClick={() => onChange([...stats, { label: '', valeur: '' }])}
          className="text-xs text-blue-700 hover:underline">+ Ajouter</button>
      </div>
      <div className="space-y-1.5">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={s.label} onChange={e => { const n = [...stats]; n[i] = { ...n[i], label: e.target.value }; onChange(n); }}
              className="input-field flex-1 text-sm" placeholder="Label" />
            <input value={s.valeur} onChange={e => { const n = [...stats]; n[i] = { ...n[i], valeur: e.target.value }; onChange(n); }}
              className="input-field flex-1 text-sm" placeholder="Valeur" />
            <button type="button" onClick={() => onChange(stats.filter((_, j) => j !== i))}
              className="text-gray-300 hover:text-red-500 text-lg leading-none">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
