export function firstName(
  fullName = ""
) {
  return (
    fullName
      .trim()
      .split(" ")[0] ||
    "Colaborador"
  );
}


export function initials(
  fullName = ""
) {
  const names =
    fullName
      .trim()
      .split(" ")
      .filter(Boolean);

  if (names.length === 0) {
    return "C";
  }

  if (names.length === 1) {
    return names[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    names[0][0] +
    names[1][0]
  ).toUpperCase();
}
