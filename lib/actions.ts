'use server';
// lib/actions.ts — Server Actions : Cloudinary upload + CRUD Supabase

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from './supabase';
import type { Projet, Realisation, Actualite, GalerieItem } from '@/types';

// ═══════════════════════════════════════════════════════════════
// CLOUDINARY — Upload image/vidéo, retourne l'URL
// ═══════════════════════════════════════════════════════════════
export async function uploadToCloudinary(formData: FormData): Promise<string> {
  const file = formData.get('file') as File;
  if (!file) throw new Error('Aucun fichier fourni');

  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!);
  data.append('folder', 'fondation-chacal');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
    { method: 'POST', body: data }
  );

  if (!res.ok) throw new Error('Échec upload Cloudinary');
  const json = await res.json();
  return json.secure_url as string;
}

// ═══════════════════════════════════════════════════════════════
// PROJETS
// ═══════════════════════════════════════════════════════════════
export async function createProjet(formData: FormData) {
  let imageUrl = formData.get('image_url_existing') as string;

  const file = formData.get('image') as File;
  if (file && file.size > 0) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    imageUrl = await uploadToCloudinary(uploadData);
  }

  const data = {
    titre:                  formData.get('titre') as string,
    status:                 formData.get('status') as string,
    description:            formData.get('description') as string,
    description_courte:     formData.get('description_courte') as string,
    date_fr:                formData.get('date_fr') as string,
    lieu:                   formData.get('lieu') as string,
    objectifs:              JSON.parse(formData.get('objectifs') as string || '[]'),
    stats:                  JSON.parse(formData.get('stats') as string || '[]'),
    titre_en:               formData.get('titre_en') as string,
    status_en:              formData.get('status_en') as string,
    description_en:         formData.get('description_en') as string,
    description_courte_en:  formData.get('description_courte_en') as string,
    date_en:                formData.get('date_en') as string,
    lieu_en:                formData.get('lieu_en') as string,
    objectifs_en:           JSON.parse(formData.get('objectifs_en') as string || '[]'),
    stats_en:               JSON.parse(formData.get('stats_en') as string || '[]'),
    image_url:              imageUrl,
    collected:              Number(formData.get('collected') || 0),
    goal:                   Number(formData.get('goal') || 0),
    ordre:                  Number(formData.get('ordre') || 0),
  };

  const { error } = await supabaseAdmin.from('projets').insert(data);
  if (error) throw new Error(error.message);
  revalidatePath('/projets');
  revalidatePath('/admin/projets');
}

export async function updateProjet(id: string, formData: FormData) {
  let imageUrl = formData.get('image_url_existing') as string;

  const file = formData.get('image') as File;
  if (file && file.size > 0) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    imageUrl = await uploadToCloudinary(uploadData);
  }

  const data = {
    titre:                  formData.get('titre') as string,
    status:                 formData.get('status') as string,
    description:            formData.get('description') as string,
    description_courte:     formData.get('description_courte') as string,
    date_fr:                formData.get('date_fr') as string,
    lieu:                   formData.get('lieu') as string,
    objectifs:              JSON.parse(formData.get('objectifs') as string || '[]'),
    stats:                  JSON.parse(formData.get('stats') as string || '[]'),
    titre_en:               formData.get('titre_en') as string,
    status_en:              formData.get('status_en') as string,
    description_en:         formData.get('description_en') as string,
    description_courte_en:  formData.get('description_courte_en') as string,
    date_en:                formData.get('date_en') as string,
    lieu_en:                formData.get('lieu_en') as string,
    objectifs_en:           JSON.parse(formData.get('objectifs_en') as string || '[]'),
    stats_en:               JSON.parse(formData.get('stats_en') as string || '[]'),
    image_url:              imageUrl,
    collected:              Number(formData.get('collected') || 0),
    goal:                   Number(formData.get('goal') || 0),
    ordre:                  Number(formData.get('ordre') || 0),
  };

  const { error } = await supabaseAdmin.from('projets').update(data).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/projets');
  revalidatePath(`/projets/${id}`);
  revalidatePath('/admin/projets');
}

export async function deleteProjet(id: string) {
  const { error } = await supabaseAdmin.from('projets').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/projets');
  revalidatePath('/admin/projets');
}

// ═══════════════════════════════════════════════════════════════
// RÉALISATIONS
// ═══════════════════════════════════════════════════════════════
export async function createRealisation(formData: FormData) {
  let imageUrl = formData.get('image_url_existing') as string;
  const file = formData.get('image') as File;
  if (file && file.size > 0) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    imageUrl = await uploadToCloudinary(uploadData);
  }

  const data = {
    titre:            formData.get('titre') as string,
    description:      formData.get('description') as string,
    date_fr:          formData.get('date_fr') as string,
    lieu:             formData.get('lieu') as string,
    beneficiaires:    formData.get('beneficiaires') as string,
    titre_en:         formData.get('titre_en') as string,
    description_en:   formData.get('description_en') as string,
    date_en:          formData.get('date_en') as string,
    lieu_en:          formData.get('lieu_en') as string,
    beneficiaires_en: formData.get('beneficiaires_en') as string,
    image_url:        imageUrl,
    stats:            JSON.parse(formData.get('stats') as string || '[]'),
    stats_en:         JSON.parse(formData.get('stats_en') as string || '[]'),
    ordre:            Number(formData.get('ordre') || 0),
  };

  const { error } = await supabaseAdmin.from('realisations').insert(data);
  if (error) throw new Error(error.message);
  revalidatePath('/realisations');
  revalidatePath('/admin/realisations');
}

export async function updateRealisation(id: string, formData: FormData) {
  let imageUrl = formData.get('image_url_existing') as string;
  const file = formData.get('image') as File;
  if (file && file.size > 0) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    imageUrl = await uploadToCloudinary(uploadData);
  }

  const data = {
    titre:            formData.get('titre') as string,
    description:      formData.get('description') as string,
    date_fr:          formData.get('date_fr') as string,
    lieu:             formData.get('lieu') as string,
    beneficiaires:    formData.get('beneficiaires') as string,
    titre_en:         formData.get('titre_en') as string,
    description_en:   formData.get('description_en') as string,
    date_en:          formData.get('date_en') as string,
    lieu_en:          formData.get('lieu_en') as string,
    beneficiaires_en: formData.get('beneficiaires_en') as string,
    image_url:        imageUrl,
    stats:            JSON.parse(formData.get('stats') as string || '[]'),
    stats_en:         JSON.parse(formData.get('stats_en') as string || '[]'),
    ordre:            Number(formData.get('ordre') || 0),
  };

  const { error } = await supabaseAdmin.from('realisations').update(data).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/realisations');
  revalidatePath('/admin/realisations');
}

export async function deleteRealisation(id: string) {
  const { error } = await supabaseAdmin.from('realisations').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/realisations');
  revalidatePath('/admin/realisations');
}

// ═══════════════════════════════════════════════════════════════
// ACTUALITÉS
// ═══════════════════════════════════════════════════════════════
export async function createActualite(formData: FormData) {
  let imageUrl: string | undefined;
  const file = formData.get('image') as File;
  if (file && file.size > 0) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    imageUrl = await uploadToCloudinary(uploadData);
  }

  const data = {
    titre:            formData.get('titre') as string,
    contenu:          formData.get('contenu') as string,
    resume:           formData.get('resume') as string,
    categorie:        formData.get('categorie') as string,
    titre_en:         formData.get('titre_en') as string,
    contenu_en:       formData.get('contenu_en') as string,
    resume_en:        formData.get('resume_en') as string,
    categorie_en:     formData.get('categorie_en') as string,
    image_url:        imageUrl,
    date_publication: formData.get('date_publication') as string,
    publie:           formData.get('publie') === 'true',
  };

  const { error } = await supabaseAdmin.from('actualites').insert(data);
  if (error) throw new Error(error.message);
  revalidatePath('/actualites');
  revalidatePath('/admin/actualites');
}

export async function updateActualite(id: string, formData: FormData) {
  let imageUrl = formData.get('image_url_existing') as string | undefined;
  const file = formData.get('image') as File;
  if (file && file.size > 0) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    imageUrl = await uploadToCloudinary(uploadData);
  }

  const data = {
    titre:            formData.get('titre') as string,
    contenu:          formData.get('contenu') as string,
    resume:           formData.get('resume') as string,
    categorie:        formData.get('categorie') as string,
    titre_en:         formData.get('titre_en') as string,
    contenu_en:       formData.get('contenu_en') as string,
    resume_en:        formData.get('resume_en') as string,
    categorie_en:     formData.get('categorie_en') as string,
    image_url:        imageUrl,
    date_publication: formData.get('date_publication') as string,
    publie:           formData.get('publie') === 'true',
  };

  const { error } = await supabaseAdmin.from('actualites').update(data).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/actualites');
  revalidatePath('/admin/actualites');
}

export async function deleteActualite(id: string) {
  const { error } = await supabaseAdmin.from('actualites').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/actualites');
  revalidatePath('/admin/actualites');
}

export async function togglePublierActualite(id: string, publie: boolean) {
  const { error } = await supabaseAdmin.from('actualites').update({ publie }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/actualites');
  revalidatePath('/admin/actualites');
}

// ═══════════════════════════════════════════════════════════════
// GALERIE
// ═══════════════════════════════════════════════════════════════
export async function addGalerieItem(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file || file.size === 0) throw new Error('Aucun fichier fourni');

  const uploadData = new FormData();
  uploadData.append('file', file);
  const url = await uploadToCloudinary(uploadData);

  const data = {
    type:       formData.get('type') as string,
    url,
    legende_fr: formData.get('legende_fr') as string || '',
    legende_en: formData.get('legende_en') as string || '',
    categorie:  formData.get('categorie') as string || 'général',
    ordre:      Number(formData.get('ordre') || 0),
  };

  const { error } = await supabaseAdmin.from('galerie').insert(data);
  if (error) throw new Error(error.message);
  revalidatePath('/galerie');
  revalidatePath('/admin/galerie');
}

export async function updateGalerieItem(id: string, formData: FormData) {
  const data = {
    legende_fr: formData.get('legende_fr') as string,
    legende_en: formData.get('legende_en') as string,
    categorie:  formData.get('categorie') as string,
    ordre:      Number(formData.get('ordre') || 0),
  };

  const { error } = await supabaseAdmin.from('galerie').update(data).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/galerie');
  revalidatePath('/admin/galerie');
}

export async function deleteGalerieItem(id: string) {
  const { error } = await supabaseAdmin.from('galerie').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/galerie');
  revalidatePath('/admin/galerie');
}
