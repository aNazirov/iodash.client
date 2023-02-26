interface Props {
  size?: number;
  progress?: number;
}

export const Spinner: React.FC<Props> = ({ size = 6, progress }) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`w-${size} h-${size} border-4 border-blue-400 border-solid rounded-full animate-spin border-t-inherit`}
      />
      {!!progress && <span>{progress}%</span>}
    </div>
  );
};
