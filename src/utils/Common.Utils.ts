export const generateVoiceName = (socketCode, name) => {
  const voiceName = `${socketCode}-${name.replace(/\s/g,'')}`;
  return voiceName;
}