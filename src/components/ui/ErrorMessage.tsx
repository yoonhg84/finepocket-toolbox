interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <p className="text-sm text-red-600 mt-2" role="alert">
      {message}
    </p>
  );
}
