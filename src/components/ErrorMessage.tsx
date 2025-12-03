type ErrorMessageProps = {
  children: React.ReactNode;
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="text-red-500 uppercase text-center font-bold text-sm bg-red-100 p-2 mb-4 rounded">{children}</p>
  )
}