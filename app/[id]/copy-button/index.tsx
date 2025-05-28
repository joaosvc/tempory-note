'use client';

import toast from 'react-hot-toast';

export function CopyButtonWrapper({ text }: { text: string }) {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copiado para a área de transferência!', {
                duration: 2000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    padding: '12px 24px',
                    fontWeight: '600',
                },
            });
        } catch (err) {
            toast.error('Erro ao copiar!');
        }
    };

    return (
        <button
            onClick={copyToClipboard}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium hover:cursor-pointer"
        >
            Copiar texto
        </button>
    );
}