'use client';
// app/admin/galerie/GalerieClient.tsx

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addGalerieItem, deleteGalerieItem, updateGalerieItem } from '@/lib/actions';
import type { GalerieItem } from '@/types';
import { Trash2, Edit, Upload, X, Check } from 'lucide-react';
import Image from 'next/image';

type Props = { items: GalerieItem[] };

export default function GalerieClient({ items }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [preview, setPreview] = useState('');

  // ── Upload ───────────────────────────────────────────────────
  function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError('');
    startTransition(async () => {
      try {
        await addGalerieItem(formData);
        setShowUpload(false);
        setPreview('');
        router.refresh();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erreur upload');
      }
    });
  }

  // ── Supprimer ─────────────────────────────────────────────────
  function handleDelete(id: string) {
    if (!confirm('Supprimer ce média ?')) return;
    startTransition(async () => {
      await deleteGalerieItem(id);
      router.refresh();
    });
  }

  // ── Modifier légende ─────────────────────────────────────────
  function handleUpdate(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateGalerieItem(id, formData);
      setEditId(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
          <X size={14} /> {error}
        </div>
      )}

      {/* Bouton + formulaire d'upload */}
      {!showUpload ? (
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Upload size={15} />
          Uploader un média
        </button>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-medium text-gray-900">Nouveau média</h2>
            <button onClick={() => { setShowUpload(false); setPreview(''); }}
              className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100">
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            {/* Fichier */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Fichier (photo ou vidéo)</label>
              <input
                type="file"
                name="file"
                accept="image/*,video/*"
                required
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) setPreview(URL.createObjectURL(f));
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {preview && (
                <div className="mt-3 w-32 h-24 rounded-xl overflow-hidden border border-gray-100">
                  <Image src={preview} alt="Aperçu" width={128} height={96} className="object-cover w-full h-full" unoptimized />
                </div>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Type</label>
              <select name="type" className="input-field" required>
                <option value="photo">Photo</option>
                <option value="video">Vidéo</option>
              </select>
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Catégorie</label>
              <select name="categorie" className="input-field">
                <option value="général">Général</option>
                <option value="événement">Événement</option>
                <option value="équipe">Équipe</option>
                <option value="bénéficiaires">Bénéficiaires</option>
                <option value="terrain">Terrain</option>
              </select>
            </div>

            {/* Légendes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Légende (FR)</label>
                <input type="text" name="legende_fr" className="input-field" placeholder="Légende en français..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Caption (EN)</label>
                <input type="text" name="legende_en" className="input-field" placeholder="Caption in English..." />
              </div>
            </div>

            {/* Ordre */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Ordre d'affichage</label>
              <input type="number" name="ordre" defaultValue={items.length} className="input-field w-24" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-60 transition-colors">
                <Upload size={14} />
                {isPending ? 'Upload en cours...' : 'Uploader'}
              </button>
              <button type="button" onClick={() => { setShowUpload(false); setPreview(''); }}
                className="px-4 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grille des médias */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-200 py-20 text-center">
          <p className="text-gray-400 text-sm">Aucun média dans la galerie</p>
          <p className="text-gray-300 text-xs mt-1">Uploadez votre premier média ci-dessus</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Miniature */}
              <div className="aspect-square relative bg-gray-50">
                {item.type === 'photo' ? (
                  <Image src={item.url} alt={item.legende_fr || ''} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm ml-0.5">▶</span>
                    </div>
                    <span className="text-xs text-gray-400">Vidéo</span>
                  </div>
                )}

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setEditId(editId === item.id ? null : item.id)}
                    className="p-2 bg-white/90 rounded-lg text-gray-800 hover:bg-white transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white/90 rounded-lg text-red-600 hover:bg-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Badge type */}
                <span className={`absolute top-2 left-2 text-[10px] font-medium px-1.5 py-0.5 rounded ${
                  item.type === 'video' ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-700'
                }`}>
                  {item.type === 'video' ? '▶ vidéo' : '📷 photo'}
                </span>
              </div>

              {/* Infos */}
              <div className="p-2.5">
                <p className="text-xs text-gray-600 truncate">{item.legende_fr || <span className="text-gray-300 italic">Sans légende</span>}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.categorie}</p>
              </div>

              {/* Formulaire d'édition inline */}
              {editId === item.id && (
                <div className="border-t border-gray-100 p-3 bg-gray-50">
                  <form onSubmit={e => handleUpdate(e, item.id)} className="space-y-2">
                    <input type="text" name="legende_fr" defaultValue={item.legende_fr}
                      className="input-field text-xs w-full" placeholder="Légende FR" />
                    <input type="text" name="legende_en" defaultValue={item.legende_en}
                      className="input-field text-xs w-full" placeholder="Caption EN" />
                    <select name="categorie" defaultValue={item.categorie} className="input-field text-xs w-full">
                      <option value="général">Général</option>
                      <option value="événement">Événement</option>
                      <option value="équipe">Équipe</option>
                      <option value="bénéficiaires">Bénéficiaires</option>
                      <option value="terrain">Terrain</option>
                    </select>
                    <input type="number" name="ordre" defaultValue={item.ordre}
                      className="input-field text-xs w-full" placeholder="Ordre" />
                    <div className="flex gap-2">
                      <button type="submit" disabled={isPending}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-60">
                        <Check size={12} /> Sauver
                      </button>
                      <button type="button" onClick={() => setEditId(null)}
                        className="flex-1 py-1.5 rounded-lg text-xs text-gray-600 border border-gray-200 hover:bg-gray-100">
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
