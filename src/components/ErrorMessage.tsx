type ErrorMessageProps = {
  children: React.ReactNode;
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="text-red-500 text-xs mt-1 font-medium">{children}</p>
  )
}