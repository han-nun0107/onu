const isHexColor = (color?: string): boolean => {
  return color?.startsWith("#") ?? false;
};

export const getDescriptionStyle = (descriptionColor?: string) => {
  if (!descriptionColor) return undefined;
  return isHexColor(descriptionColor) ? { color: descriptionColor } : undefined;
};

export const getDescriptionClassName = (descriptionColor?: string) => {
  const defaultColor = "text-gray-800";
  if (!descriptionColor) return defaultColor;
  return isHexColor(descriptionColor) ? defaultColor : descriptionColor;
};
