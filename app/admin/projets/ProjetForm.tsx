'use client';
// app/admin/projets/ProjetForm.tsx — Formulaire bilingue création/édition

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Projet } from '@/types';

type Props = {
  projet?: Projet;
  onSave: (formData: FormData) => Promise<void>;
};

export default function ProjetForm({ projet, onSave }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(projet?.image_url || '');
  const [objectifsFr, setObjectifsFr] = useState<string[]>(projet?.objectifs || ['']);
  const [objectifsEn, setObjectifsEn] = useState<string[]>(projet?.objectifs_en || ['']);
  const [statsFr, setStatsFr] = useState<{label:string;valeur:string}[]>(projet?.stats || []);
  const [statsEn, setStatsEn] = useState<{label:string;valeur:string}[]>(projet?.stats_en || []);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('objectifs', JSON.stringify(objectifsFr.filter(Boolean)));
    formData.set('objectifs_en', JSON.stringify(objectifsEn.filter(Boolean)));
    formData.set('stats', JSON.stringify(statsFr.filter(s => s.label)));
    formData.set('stats_en', JSON.stringify(statsEn.filter(s => s.label)));
    if (projet) formData.set('image_url_existing', projet.image_url);

    setError('');
    startTransition(async () => {
      try {
        await onSave(formData);
        router.push('/admin/projets');
        router.refresh();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      {/* Image */}
      <Section title="Image principale">
        <div className="flex items-start gap-6">
          {imagePreview && (
            <div className="relative w-40 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
              <Image src={imagePreview} alt="Aperçu" fill className="object-cover" unoptimized />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-2">JPG, PNG ou WebP · max 5 Mo · sera hébergée sur Cloudinary</p>
          </div>
        </div>
      </Section>

      {/* Collecte */}
      <Section title="Financement">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Montant collecté (XAF)" name="collected" type="number" defaultValue={projet?.collected ?? 0} required />
          <Field label="Objectif (XAF)" name="goal" type="number" defaultValue={projet?.goal ?? 0} required />
          <Field label="Ordre d'affichage" name="ordre" type="number" defaultValue={projet?.ordre ?? 0} />
        </div>
      </Section>

      {/* Contenu FR/EN côte à côte */}
      <div className="grid grid-cols-2 gap-6">

        {/* FRANÇAIS */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-lg">🇫🇷</span>
            <h3 className="text-sm font-medium text-gray-900">Contenu Français</h3>
          </div>
          <Field label="Titre" name="titre" defaultValue={projet?.titre} required />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Statut</label>
            <select name="status" defaultValue={projet?.status || 'À venir'} className="input-field">
              <option value="En cours">En cours</option>
              <option value="À venir">À venir</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
          <Field label="Date" name="date_fr" defaultValue={projet?.date_fr} placeholder="ex: 23 Mai 2026" required />
          <Field label="Lieu" name="lieu" defaultValue={projet?.lieu} required />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Description courte</label>
            <textarea name="description_courte" rows={2} defaultValue={projet?.description_courte} required
              className="input-field resize-none" placeholder="Résumé affiché sur les cards..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Description complète</label>
            <textarea name="description" rows={5} defaultValue={projet?.description} required
              className="input-field resize-none" />
          </div>
          <ListEditor label="Objectifs" items={objectifsFr} onChange={setObjectifsFr} />
          <StatsEditor label="Statistiques" stats={statsFr} onChange={setStatsFr} />
        </div>

        {/* ANGLAIS */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-lg">🇬🇧</span>
            <h3 className="text-sm font-medium text-gray-900">Contenu Anglais</h3>
          </div>
          <Field label="Title" name="titre_en" defaultValue={projet?.titre_en} required />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
            <select name="status_en" defaultValue={projet?.status_en || 'Upcoming'} className="input-field">
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <Field label="Date" name="date_en" defaultValue={projet?.date_en} placeholder="e.g. May 23, 2026" required />
          <Field label="Location" name="lieu_en" defaultValue={projet?.lieu_en} required />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Short description</label>
            <textarea name="description_courte_en" rows={2} defaultValue={projet?.description_courte_en} required
              className="input-field resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Full description</label>
            <textarea name="description_en" rows={5} defaultValue={projet?.description_en} required
              className="input-field resize-none" />
          </div>
          <ListEditor label="Objectives" items={objectifsEn} onChange={setObjectifsEn} />
          <StatsEditor label="Statistics" stats={statsEn} onChange={setStatsEn} />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()}
          className="px-5 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
          Annuler
        </button>
        <button type="submit" disabled={isPending}
          className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-60 transition-colors">
          {isPending ? 'Enregistrement...' : projet ? 'Mettre à jour' : 'Créer le projet'}
        </button>
      </div>
    </form>
  );
}

// ── Composants utilitaires ──────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, name, type = 'text', defaultValue, required, placeholder }: {
  label: string; name: string; type?: string;
  defaultValue?: string | number; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
      <input type={type} name={name} defaultValue={defaultValue as string} required={required}
        placeholder={placeholder}
        className="input-field" />
    </div>
  );
}

function ListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <button type="button" onClick={() => onChange([...items, ''])}
          className="text-xs text-blue-700 hover:underline">+ Ajouter</button>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={item} onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
              className="input-field flex-1 text-sm" placeholder={`${label} ${i + 1}`} />
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-gray-300 hover:text-red-500 text-lg leading-none">×</button>
          </div>
        ))}
      </div>
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
