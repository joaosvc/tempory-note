import { CopyButtonWrapper } from "./copy-button";

export default async function NotePage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const res = await fetch(`${baseUrl}/api/note/get/${params.id}`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const content = data.content || null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Nota Temporaria</h1>
        {content ? (
          <>
            <pre className="bg-gray-50 p-4 border border-gray-200 rounded-xl text-gray-700 whitespace-pre-wrap mb-4">
              {content}
            </pre>
            <CopyButtonWrapper text={content} />
          </>
        ) : (
          <p className="text-center text-gray-500">Texto não encontrado ou expirado.</p>
        )}
      </div>
    </div>
  );
}