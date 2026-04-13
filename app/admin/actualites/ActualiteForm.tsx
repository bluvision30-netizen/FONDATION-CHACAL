'use client';
// app/admin/actualites/ActualiteForm.tsx

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Actualite } from '@/types';

type Props = {
  actualite?: Actualite;
  onSave: (formData: FormData) => Promise<void>;
};

export default function ActualiteForm({ actualite, onSave }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(actualite?.image_url || '');
  const [publie, setPublie] = useState(actualite?.publie ?? false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('publie', publie ? 'true' : 'false');
    if (actualite?.image_url) formData.set('image_url_existing', actualite.image_url);

    setError('');
    startTransition(async () => {
      try {
        await onSave(formData);
        router.push('/admin/actualites');
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

      {/* Paramètres généraux */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Paramètres</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Date de publication</label>
            <input type="date" name="date_publication"
              defaultValue={actualite?.date_publication || new Date().toISOString().split('T')[0]}
              required className="input-field" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Catégorie (FR)</label>
            <input type="text" name="categorie" defaultValue={actualite?.categorie || 'Actualité'}
              required className="input-field" placeholder="Santé, Événement..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Category (EN)</label>
            <input type="text" name="categorie_en" defaultValue={actualite?.categorie_en || 'News'}
              required className="input-field" placeholder="Health, Event..." />
          </div>
        </div>

        {/* Image */}
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Image de couverture</label>
          <div className="flex items-start gap-4">
            {imagePreview && (
              <div className="relative w-32 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                <Image src={imagePreview} alt="Aperçu" fill className="object-cover" unoptimized />
              </div>
            )}
            <input type="file" name="image" accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) setImagePreview(URL.createObjectURL(f)); }}
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
          </div>
        </div>

        {/* Statut publication */}
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={() => setPublie(!publie)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${publie ? 'bg-blue-600' : 'bg-gray-200'}`}>
            <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${publie ? 'translate-x-4' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm text-gray-700">{publie ? 'Publié (visible sur le site)' : 'Brouillon (non visible)'}</span>
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
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Titre</label>
            <input type="text" name="titre" defaultValue={actualite?.titre} required className="input-field"
              placeholder="Titre de l'article..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Résumé</label>
            <textarea name="resume" rows={2} defaultValue={actualite?.resume} required
              className="input-field resize-none" placeholder="Résumé affiché sur la liste..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Contenu complet</label>
            <textarea name="contenu" rows={10} defaultValue={actualite?.contenu} required
              className="input-field resize-none font-mono text-xs" placeholder="Contenu de l'article..." />
          </div>
        </div>

        {/* ANGLAIS */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-lg">🇬🇧</span>
            <h3 className="text-sm font-medium text-gray-900">English Content</h3>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Title</label>
            <input type="text" name="titre_en" defaultValue={actualite?.titre_en} required className="input-field"
              placeholder="Article title..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Summary</label>
            <textarea name="resume_en" rows={2} defaultValue={actualite?.resume_en} required
              className="input-field resize-none" placeholder="Summary shown on the list..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Full content</label>
            <textarea name="contenu_en" rows={10} defaultValue={actualite?.contenu_en} required
              className="input-field resize-none font-mono text-xs" placeholder="Article content..." />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()}
          className="px-5 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
          Annuler
        </button>
        <button type="submit" disabled={isPending}
          className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-60 transition-colors">
          {isPending ? 'Enregistrement...' : actualite ? 'Mettre à jour' : 'Créer l\'article'}
        </button>
      </div>
    </form>
  );
}
