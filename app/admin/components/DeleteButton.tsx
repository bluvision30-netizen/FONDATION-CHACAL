'use client';
// app/admin/components/DeleteButton.tsx
// Composant client réutilisable pour les boutons de suppression avec confirmation

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';

type Props = {
  action: () => Promise<void>;
  message?: string;
};

export default function DeleteButton({ action, message = 'Confirmer la suppression ?' }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(message)) return;
    startTransition(async () => {
      await action();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
    >
      <Trash2 size={14} />
    </button>
  );
}