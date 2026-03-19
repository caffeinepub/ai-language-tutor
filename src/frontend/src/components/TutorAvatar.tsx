interface TutorAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TutorAvatar({ size = "md", className = "" }: TutorAvatarProps) {
  const sizeMap = {
    sm: "w-7 h-7",
    md: "w-12 h-12",
    lg: "w-48 h-48 md:w-56 md:h-56",
  };

  return (
    <img
      src="/assets/generated/ai-tutor-avatar-transparent.dim_200x200.png"
      alt="AI Tutor"
      className={`rounded-full object-cover ${sizeMap[size]} ${className}`}
    />
  );
}
