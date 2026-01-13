interface LoadingStateProps {
  message: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-brand-deep-pink mb-4"></div>
        <p className="text-muted-foreground font-inter">{message}</p>
      </div>
    </div>
  );
};