interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <p className="text-sm text-red-600 dark:text-red-400 mt-2" role="alert">
      {message}
    </p>
  );
}
