# Dashboard Admin — Fondation Le Chacal
## Guide d'installation complet

---

## 1. Installer les dépendances

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## 2. Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

Les clés Supabase se trouvent dans :
**Supabase Dashboard → Settings → API**

---

## 3. Créer la base de données Supabase

1. Aller dans **Supabase Dashboard → SQL Editor**
2. Coller et exécuter le contenu de `supabase/schema.sql`
3. Toutes les tables, politiques RLS et triggers seront créés

---

## 4. Créer le compte admin

1. Aller dans **Supabase Dashboard → Authentication → Users**
2. Cliquer **Add user**
3. Entrer l'email et mot de passe de l'admin
4. Cet utilisateur pourra se connecter à `/admin/login`

---

## 5. Configurer Cloudinary

1. Aller dans **Cloudinary Dashboard → Settings → Upload**
2. Créer un **Upload Preset** en mode **Unsigned**
3. Nommer le preset : `fondation_chacal_preset`
4. Copier le `cloud_name` depuis le Dashboard principal

---

## 6. Ajouter le CSS des formulaires

Dans `app/globals.css`, ajouter à la fin :

```css
.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #111827;
  background: white;
  transition: box-shadow 0.15s;
}

.input-field:focus {
  outline: none;
  ring: 2px solid #3b82f6;
  border-color: transparent;
}

.input-field::placeholder {
  color: #d1d5db;
}
```

---

## 7. Structure des fichiers à placer dans le projet

```
app/
  admin/
    layout.tsx              ← Layout avec sidebar
    page.tsx                ← Vue d'ensemble
    AdminSidebar.tsx        ← Sidebar navigation
    login/
      page.tsx              ← Page de connexion
    projets/
      page.tsx              ← Liste des projets
      ProjetForm.tsx        ← Formulaire bilingue
      nouveau/page.tsx      ← Création
      [id]/page.tsx         ← Édition
    realisations/
      page.tsx
      RealisationForm.tsx
      nouvelle/page.tsx
      [id]/page.tsx
    actualites/
      page.tsx
      ActualiteForm.tsx
      nouvelle/page.tsx
      [id]/page.tsx
    galerie/
      page.tsx
      GalerieClient.tsx

lib/
  supabase.ts               ← Clients Supabase
  actions.ts                ← Server Actions

types/
  index.ts                  ← Types TypeScript

middleware.ts               ← Protection /admin
```

---

## 8. Accéder au dashboard

```
https://votre-site.com/admin
```

→ Redirige vers `/admin/login` si non connecté
→ Dashboard accessible après connexion

---

## 9. Migrer les pages publiques vers Supabase

Remplacer dans `app/projets/[id]/page.tsx` :

```ts
// AVANT (données statiques)
import { projets, getProjet } from '@/data/projets';

export async function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}
```

```ts
// APRÈS (Supabase)
import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data } = await supabase.from('projets').select('id');
  return (data ?? []).map((p) => ({ id: p.id }));
}

export default async function PageProjet({ params }) {
  const { id } = await params;
  const { data: projet } = await supabase
    .from('projets')
    .select('*')
    .eq('id', id)
    .single();
  if (!projet) notFound();
  return <ProjetClient projet={projet} />;
}
```
