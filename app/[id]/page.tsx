import { CopyButtonWrapper } from "./copy-button";
// @ts-ignore
export default async function NotePage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const res = await fetch(`${baseUrl}/api/note/get/${params.id}`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const content = data.content || null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Nota Temporária
        </h1>
        {content ? (
          <>
            <pre className="bg-gray-50 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-100 whitespace-pre-wrap break-words mb-4 max-h-[400px] overflow-auto text-sm">
              {content}
            </pre>
            <CopyButtonWrapper text={content} />
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Texto não encontrado ou expirado.
          </p>
        )}
      </div>
    </div>
  );
}