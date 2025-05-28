'use client';

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const handleGenerate = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch('/api/note/save', {
        method: 'POST',
        body: JSON.stringify({ content: input }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      
      const fullLink = `${window.location.origin}/${data.id}`;
      setLink(fullLink);
    } catch (error: any) {
      alert(`Erro ao gerar o texto: ${error.message}`);
      setLink('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Gerador de Texto</h1>

        <div className="flex flex-col gap-4">
          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite algo..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none text-base"
          />
          <button
            onClick={handleGenerate}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium hover:cursor-pointer"
          >
            Gerar
          </button>

          {link && (
            <div className="mt-2 flex flex-row space-x-2 justify-center">
              <span>Seu link:</span>
              <a
              href={link}
              className="text-blue-600 underline text-center hover:text-blue-800 transition"
            >
              {link}
            </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
