interface Props {
  icon: React.ElementType;
  label: string;
  onClose?: () => void;
  onPress: () => void; // ganti nama
  className?: string;
}

const Button = ({ icon: Icon, label, onClose, onPress, className }: Props) => {
  const handleClick = () => {
    onClose?.();
    onPress();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg shadow-xs ${className} transition-all cursor-pointer`}
    >
      <Icon className="w-4 h-4" />
      <span className="truncate">{label}</span>
    </button>
  );
};

export default Button;
